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
  courseName: string;  
  studentId: string;  
}

interface TestChartEntry {
  testTitle: string;     
  averageScore: number;
  studentScore?: number | null;  
}

const StudentCourseFullScoreChart = ({ courseName, studentId }: Props) => {
  const theme = useTheme();

  const { data: testsData } = useGetTestsByCourseQuery({ courseName });

  const [triggerGetScores] = useLazyGetTestScoresQuery();

  const [chartData, setChartData] = useState<TestChartEntry[]>([]);

  const [averageScore, setAverageScore] = useState<number>(0);

  const [studentAverage, setStudentAverage] = useState<number | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      if (!testsData?.tests) {
        return;
      }

      let allScores: number[] = [];    
      let studentScores: number[] = [];  
      const tempChart: TestChartEntry[] = []; 

      for (const test of testsData.tests) {
        try {
          const result = await triggerGetScores(test._id).unwrap();
          const scores = result?.scores ?? [];
          const testAllScores = scores
            .map((s: any) => s.score)
            .filter((score: any) => typeof score === "number");
          const testAvg =
            testAllScores.length > 0
              ? testAllScores.reduce((sum: any, s: any) => sum + s, 0) / testAllScores.length
              : 0;

          const studentScoreObj = scores.find(
            (s: any) =>
              String((s.studentId as any)?._id ?? s.studentId) === String(studentId)
          );

          const studentScore = studentScoreObj?.score ?? null;

          if (typeof studentScore === "number") studentScores.push(studentScore);
          allScores.push(...testAllScores);

          tempChart.push({
            testTitle: test.title,
            averageScore: Math.round(testAvg * 10) / 10,
            studentScore,
          });
        } catch (err) {
          console.error(`❌ Error fetching scores for test "${test.title}":`, err);
        }
      }

      const avgAll =
        allScores.length > 0
          ? Math.round(
              (allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10
            ) / 10
          : 0;

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
