import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  useGetTestsByCourseQuery,
  useLazyGetTestScoresQuery,
} from "../../redux/slice/api/testApi";

interface Props {
  courseName: string;   // Course name
  studentId: string;    // Student ID
}

// Structure of an entry in the chart displaying test results
interface TestChartEntry {
  testTitle: string;      // Test title
  averageScore: number;   // Class average score for the test
  studentScore?: number | null;  // Student's score for the test (if exists)
}

const StudentCourseFullScoreChart = ({ courseName, studentId }: Props) => {
  const theme = useTheme();

  // Fetch list of tests by course name
  const { data: testsData } = useGetTestsByCourseQuery({ courseName });

  // Lazy function to fetch scores for a specific test (called manually)
  const [triggerGetScores] = useLazyGetTestScoresQuery();

  // State to store chart data
  const [chartData, setChartData] = useState<TestChartEntry[]>([]);

  // Overall class average score
  const [averageScore, setAverageScore] = useState<number>(0);

  // Individual student average score (can be null if no data)
  const [studentAverage, setStudentAverage] = useState<number | null>(null);

  // Use effect to fetch scores after loading list of tests
  useEffect(() => {
    const fetchScores = async () => {
      if (!testsData?.tests) {
        // If no tests for the course, do nothing
        return;
      }

      let allScores: number[] = [];      // All scores of all students for all tests
      let studentScores: number[] = [];  // Only the student's scores
      const tempChart: TestChartEntry[] = []; // Build data for the chart

      for (const test of testsData.tests) {
        try {
          // Request scores for a specific test
          const result = await triggerGetScores(test._id).unwrap();
          const scores = result?.scores ?? [];

          // Extract only numeric score values
          const testAllScores = scores
            .map((s: any) => s.score)
            .filter((score: any) => typeof score === "number");

          // Calculate class average for the test
          const testAvg =
            testAllScores.length > 0
              ? testAllScores.reduce((sum: any, s: any) => sum + s, 0) / testAllScores.length
              : 0;

          // Find the student's score for the current test
          const studentScoreObj = scores.find(
            (s: any) =>
              String((s.studentId as any)?._id ?? s.studentId) === String(studentId)
          );

          // Student's score (if exists)
          const studentScore = studentScoreObj?.score ?? null;

          if (typeof studentScore === "number") studentScores.push(studentScore);
          allScores.push(...testAllScores);

          // Add to chart data
          tempChart.push({
            testTitle: test.title,
            averageScore: Math.round(testAvg * 10) / 10,
            studentScore,
          });
        } catch (err) {
          console.error(`❌ Error fetching scores for test "${test.title}":`, err);
        }
      }

      // Overall average of all scores from all tests
      const avgAll =
        allScores.length > 0
          ? Math.round(
              (allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10
            ) / 10
          : 0;

      // Overall individual average of the student
      const avgStudent =
        studentScores.length > 0
          ? Math.round(
              (studentScores.reduce((a, b) => a + b, 0) / studentScores.length) * 10
            ) / 10
          : 0;

      setChartData(tempChart);
      setAverageScore(avgAll);
      setStudentAverage(avgStudent);
    };

    fetchScores();
  }, [testsData, triggerGetScores, studentId, courseName]);

  // Function to get comparison text between averages
  const getComparisonText = () => {
    if (studentAverage === null) return "No score data available";
    if (studentAverage > averageScore) return "You are above average 👏";
    if (studentAverage < averageScore) return "You are below average 📉";
    return "You are exactly at average 🎯";
  };

  return (
    <Box mt={5}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Test score comparison by course {courseName}
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="testTitle" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="averageScore"
            name="Class Average"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="studentScore"
            name="My Score"
            stroke={theme.palette.secondary.main}
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" textAlign="center" gutterBottom>
        Overall personal average vs. overall class average
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={[
            { name: "Class Average", score: averageScore },
            { name: "My Score", score: studentAverage ?? 0 },
          ]}
        >
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>

      <Typography variant="body1" textAlign="center" mt={2}>
        {getComparisonText()}
      </Typography>
    </Box>
  );
};

export default StudentCourseFullScoreChart;
