// // // import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // // interface AggregatedScore {
// // //   testTitle: string;
// // //   averageScore: number;
// // // }

// // // interface Props {
// // //   aggregatedScores: AggregatedScore[];
// // // }

// // // const CourseScoresChart = ({ aggregatedScores }: Props) => (
// // //   <ResponsiveContainer width="100%" height={300}>
// // //     <LineChart data={aggregatedScores}>
// // //       <XAxis dataKey="testTitle" />
// // //       <YAxis />
// // //       <Tooltip />
// // //       <Legend />
// // //       <Line type="monotone" dataKey="averageScore" stroke="#3f51b5" />
// // //     </LineChart>
// // //   </ResponsiveContainer>
// // // );

// // // export default CourseScoresChart;



// // import React from 'react';
// // import {
// //   Card,
// //   CardContent,
// //   Typography,
// //   Box,
// //   Paper,
// //   useTheme,
// //   alpha
// // } from '@mui/material';
// // import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// // interface AggregatedScore {
// //   testTitle: string;
// //   averageScore: number;
// // }

// // interface Props {
// //   aggregatedScores: AggregatedScore[];
// // }

// // const CourseScoresChart = ({ aggregatedScores }: Props) => {
// //   const theme = useTheme();
  
// //   // Custom tooltip component
// //   const CustomTooltip = ({ active, payload, label }: any) => {
// //     if (active && payload && payload.length) {
// //       return (
// //         <Paper
// //           elevation={8}
// //           sx={{
// //             p: 2,
// //             bgcolor: alpha(theme.palette.background.paper, 0.95),
// //             border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
// //             borderRadius: 2,
// //           }}
// //         >
// //           <Typography variant="body2" fontWeight="medium" color="text.primary">
// //             {label}
// //           </Typography>
// //           <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
// //             ציון ממוצע: {payload[0].value.toFixed(1)}
// //           </Typography>
// //         </Paper>
// //       );
// //     }
// //     return null;
// //   };

// //   return (
// //     <Card
// //       elevation={4}
// //       sx={{
// //         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
// //         border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
// //         borderRadius: 3,
// //         overflow: 'hidden',
// //         transition: 'all 0.3s ease-in-out',
// //         '&:hover': {
// //           elevation: 8,
// //           transform: 'translateY(-2px)',
// //           boxShadow: theme.shadows[8],
// //         }
// //       }}
// //     >
// //       <CardContent sx={{ p: 3 }}>
// //         {/* Header */}
// //         <Box sx={{ 
// //           display: 'flex', 
// //           alignItems: 'center', 
// //           mb: 3,
// //           pb: 2,
// //           borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`
// //         }}>
// //           <Box
// //             sx={{
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               width: 48,
// //               height: 48,
// //               borderRadius: '50%',
// //               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
// //               mr: 2,
// //               boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
// //             }}
// //           >
// //             <TrendingUpIcon sx={{ color: 'white', fontSize: 24 }} />
// //           </Box>
// //           <Box>
// //             <Typography 
// //               variant="h5" 
// //               component="h2" 
// //               fontWeight="bold"
// //               sx={{
// //                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// //                 backgroundClip: 'text',
// //                 WebkitBackgroundClip: 'text',
// //                 WebkitTextFillColor: 'transparent',
// //                 mb: 0.5
// //               }}
// //             >
// //               מעקב ציונים
// //             </Typography>
// //             <Typography 
// //               variant="body2" 
// //               color="text.secondary"
// //               sx={{ fontWeight: 500 }}
// //             >
// //               גרף התקדמות הציונים הממוצעים במבחנים
// //             </Typography>
// //           </Box>
// //         </Box>

// //         {/* Chart Container */}
// //         <Box
// //           sx={{
// //             position: 'relative',
// //             height: 340,
// //             p: 2,
// //             bgcolor: alpha(theme.palette.background.paper, 0.7),
// //             borderRadius: 2,
// //             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
// //             '&::before': {
// //               content: '""',
// //               position: 'absolute',
// //               top: 0,
// //               left: 0,
// //               right: 0,
// //               bottom: 0,
// //               background: `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.primary.main, 0.05)}, transparent 50%)`,
// //               borderRadius: 2,
// //               pointerEvents: 'none',
// //             }
// //           }}
// //         >
// //           <ResponsiveContainer width="100%" height="100%">
// //             <LineChart 
// //               data={aggregatedScores}
// //               margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
// //             >
// //               <XAxis 
// //                 dataKey="testTitle"
// //                 tick={{ 
// //                   fontSize: 12, 
// //                   fill: theme.palette.text.secondary,
// //                   fontWeight: 500
// //                 }}
// //                 axisLine={{ 
// //                   stroke: alpha(theme.palette.primary.main, 0.3),
// //                   strokeWidth: 2
// //                 }}
// //                 tickLine={{ 
// //                   stroke: alpha(theme.palette.primary.main, 0.3),
// //                   strokeWidth: 1
// //                 }}
// //                 angle={-45}
// //                 textAnchor="end"
// //                 height={80}
// //               />
// //               <YAxis 
// //                 tick={{ 
// //                   fontSize: 12, 
// //                   fill: theme.palette.text.secondary,
// //                   fontWeight: 500
// //                 }}
// //                 axisLine={{ 
// //                   stroke: alpha(theme.palette.primary.main, 0.3),
// //                   strokeWidth: 2
// //                 }}
// //                 tickLine={{ 
// //                   stroke: alpha(theme.palette.primary.main, 0.3),
// //                   strokeWidth: 1
// //                 }}
// //                 domain={[0, 100]}
// //               />
// //               <Tooltip content={<CustomTooltip />} />
// //               <Legend 
// //                 wrapperStyle={{
// //                   paddingTop: '20px',
// //                   fontSize: '14px',
// //                   fontWeight: 500,
// //                   color: theme.palette.text.primary
// //                 }}
// //               />
// //               <Line 
// //                 type="monotone" 
// //                 dataKey="averageScore" 
// //                 stroke={theme.palette.primary.main}
// //                 strokeWidth={3}
// //                 dot={{ 
// //                   fill: theme.palette.primary.main, 
// //                   strokeWidth: 3,
// //                   stroke: theme.palette.background.paper,
// //                   r: 6
// //                 }}
// //                 activeDot={{ 
// //                   r: 8, 
// //                   fill: theme.palette.secondary.main,
// //                   stroke: theme.palette.background.paper,
// //                   strokeWidth: 3,
// //                   // boxShadow: `0 0 12px ${alpha(theme.palette.secondary.main, 0.6)}`
// //                 }}
// //                 name="ציון ממוצע"
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Box>

// //         {/* Stats Footer */}
// //         <Box 
// //           sx={{ 
// //             mt: 3, 
// //             pt: 2, 
// //             borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
// //             display: 'flex',
// //             justifyContent: 'space-between',
// //             alignItems: 'center'
// //           }}
// //         >
// //           <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
// //             סה"כ מבחנים: {aggregatedScores.length}
// //           </Typography>
// //           {aggregatedScores.length > 0 && (
// //             <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
// //               ציון ממוצע כללי: {
// //                 (aggregatedScores.reduce((sum, score) => sum + score.averageScore, 0) / aggregatedScores.length).toFixed(1)
// //               }
// //             </Typography>
// //           )}
// //         </Box>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default CourseScoresChart;











import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  useGetTestsByCourseForTeacherQuery,
  useLazyGetTestScoresQuery
} from "../redux/slice/api/testApi";
interface AggregatedScore {
  testTitle: string;
  averageScore: number;
}
interface StudentScore {
  studentId: string;
  userName: string;
  score: number;
  finishedAt?: string;
}
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

interface Props {
  aggregatedScores: AggregatedScore[];
}


const CourseScoresChart = ({ aggregatedScores }: Props) => {
  const theme = useTheme();
  const grades: { [testId: string]: StudentScore[] } = {};
  const [triggerGetTestScores] = useLazyGetTestScoresQuery();

  const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
    const testList: TestType[] = testsData?.tests ?? [];

    for (const test of testList) {
      try {
        const response =  triggerGetTestScores(test._id).unwrap();
        grades[test._id] = response.scores ?? [];
      } catch (err) {
        console.error("שגיאה בטעינת ציונים למבחן:", test.title, err);
        grades[test._id] = [];
      }
    }

    setSelectedGrades(grades);
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={8}
          sx={{
            p: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" fontWeight="medium" color="text.primary">
            {label}
          </Typography>
          <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
            ציון ממוצע: {payload[0].value.toFixed(1)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };


  return (
    <Card
      elevation={4}
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          elevation: 8,
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          pb: 2,
          borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              mr: 2,
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <TrendingUpIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography 
              variant="h5" 
              component="h2" 
              fontWeight="bold"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5
              }}
            >
              מעקב ציונים
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              גרף התקדמות הציונים הממוצעים במבחנים
            </Typography>
          </Box>
        </Box>

        {/* Chart Container */}
        <Box
          sx={{
            position: 'relative',
            height: 340,
            p: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.primary.main, 0.05)}, transparent 50%)`,
              borderRadius: 2,
              pointerEvents: 'none',
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={aggregatedScores}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <XAxis 
                dataKey="testTitle"
                tick={{ 
                  fontSize: 12, 
                  fill: theme.palette.text.secondary,
                  fontWeight: 500
                }}
                axisLine={{ 
                  stroke: alpha(theme.palette.primary.main, 0.3),
                  strokeWidth: 2
                }}
                tickLine={{ 
                  stroke: alpha(theme.palette.primary.main, 0.3),
                  strokeWidth: 1
                }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ 
                  fontSize: 12, 
                  fill: theme.palette.text.secondary,
                  fontWeight: 500
                }}
                axisLine={{ 
                  stroke: alpha(theme.palette.primary.main, 0.3),
                  strokeWidth: 2
                }}
                tickLine={{ 
                  stroke: alpha(theme.palette.primary.main, 0.3),
                  strokeWidth: 1
                }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: theme.palette.text.primary
                }}
              />
              <Line 
                type="monotone" 
                dataKey="averageScore" 
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                dot={{ 
                  fill: theme.palette.primary.main, 
                  strokeWidth: 3,
                  stroke: theme.palette.background.paper,
                  r: 6
                }}
                activeDot={{ 
                  r: 8, 
                  fill: theme.palette.secondary.main,
                  stroke: theme.palette.background.paper,
                  strokeWidth: 3,
                }}
                name="ציון ממוצע"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Stats Footer */}
        <Box 
          sx={{ 
            mt: 3, 
            pt: 2, 
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            סה"כ מבחנים: {aggregatedScores.length}
          </Typography>
          {aggregatedScores.length > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              ציון ממוצע כללי: {
                (aggregatedScores.reduce((sum, score) => sum + score.averageScore, 0) / aggregatedScores.length).toFixed(1)
              }
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseScoresChart;

