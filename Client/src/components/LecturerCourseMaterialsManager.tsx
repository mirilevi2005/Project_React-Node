
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Box,
} from '@mui/material';
import {
  VideoLibrary as VideoIcon,
  Quiz as QuizIcon,
  Assessment as AssessmentIcon,
  BarChart as ChartIcon,
} from '@mui/icons-material';

import VideoUpload from './video/VideoUpload';
import CreateAndAddTest from './test/CreateAndAddTest';
import Tests from './test/Tests';
import CourseScoresChart from './CourseScoresChart';

import {
  useGetTestsByCourseForTeacherQuery,
  useLazyGetTestScoresQuery,
} from "../redux/slice/api/testApi";

type Panel = {
  key: 'videos' | 'createTest' | 'tests' | 'grades';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonLabel: string;
  component: React.ReactNode;
};

interface TestType {
  _id: string;
  title: string;
  lastDate: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
    timeLimit: number;
  }[];
}

interface StudentScore {
  studentId: string;
  userName: string;
  score: number;
  finishedAt?: string;
}

const LecturerCourseMaterialsManager = () => {
  const theme = useTheme();
  const [activePanel, setActivePanel] = useState<'videos' | 'createTest' | 'tests' | 'grades' | null>(null);

  // חילוץ שם הקורס מה-URL
  const urlParts = window.location.pathname.split("/");
  const courseName = urlParts[urlParts.length - 1];

  // טעינת המבחנים של הקורס
  const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
  const testList: TestType[] = testsData?.tests ?? [];

  // קריאה עצלנית לציוני מבחנים
  const [triggerGetTestScores] = useLazyGetTestScoresQuery();

  // state לאחסון ציונים לפי מבחן
  const [selectedGrades, setSelectedGrades] = useState<{ [testId: string]: StudentScore[] }>({});



  // טען ציונים עבור כל מבחן ברגע שיש מבחנים ב-testList
  useEffect(() => {
    const fetchGrades = async () => {
      const grades: { [testId: string]: StudentScore[] } = {};
      for (const test of testList) {
        try {
          const response = await triggerGetTestScores(test._id).unwrap();
          grades[test._id] = response.scores ?? [];
        } catch (error) {
          console.error("❌ שגיאה בטעינת ציונים:", error);
          grades[test._id] = [];
        }
      }
      setSelectedGrades(grades);
    };

    if (testList.length > 0) {
      fetchGrades();
    }
  }, [testList, triggerGetTestScores]);

  // חישוב ממוצע ציונים לכל מבחן להצגה בגרף
  const aggregatedScores = testList.map((test) => {
  const scores = selectedGrades[test._id] ?? [];
  const avgScore =scores.reduce((sum, s) => sum + s.score, 0) / (scores.length || 1);
  return {
    testTitle: test.title,
    averageScore: avgScore,
  };
});

  // פונקציה ליצירת הפאנלים עם הקומפוננטות המתאימות
  const createPanels = (
    courseName: string,
    refetchTests: () => void,
    theme: any
  ): Panel[] => [
      {
        key: 'videos',
        icon: <VideoIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />,
        title: 'סרטוני לימוד',
        subtitle: 'צפייה וניהול סרטוני הקורס',
        buttonLabel: 'סרטונים',
        component: <VideoUpload />,
      },
      {
        key: 'createTest',
        icon: <QuizIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />,
        title: 'יצירת מבחן',
        subtitle: 'הוספת מבחן חדש לתלמידים',
        buttonLabel: 'מבחן חדש',
        component: <CreateAndAddTest courseName={courseName} refetchTests={refetchTests} />,
      },
      {
        key: 'tests',
        icon: <AssessmentIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />,
        title: 'מבחנים קיימים',
        subtitle: 'צפייה וניהול כל המבחנים',
        buttonLabel: 'מבחנים',
        component: <Tests />,
      },
      {
        key: 'grades',
        icon: <ChartIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />,
        title: 'ציוני תלמידים',
        subtitle: 'צפייה בציוני התלמידים',
        buttonLabel: 'ציונים',
        component: <CourseScoresChart aggregatedScores={aggregatedScores} courseName={courseName}  />,
      },
    ];

  const panels = createPanels(courseName, refetch, theme);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {panels.map(({ key, icon, title, subtitle, buttonLabel }) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-5px)' },
                border: activePanel === key ? `2px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                {icon}
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={activePanel === key ? 'contained' : 'outlined'}
                  onClick={() => setActivePanel(activePanel === key ? null : key)}
                >
                  {activePanel === key ? 'הסתר' : `הצג ${buttonLabel}`}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        {panels.map(panel =>
          panel.key === activePanel ? <Box key={panel.key}>{panel.component}</Box> : null
        )}
      </Box>
    </Container>
  );
};

export default LecturerCourseMaterialsManager;