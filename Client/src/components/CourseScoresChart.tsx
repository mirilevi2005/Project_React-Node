
// // import React,{ useEffect, useState } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   Typography,
// //   Box,
// //   Paper,
// //   useTheme,
// //   alpha,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Collapse,
// //   IconButton,
// // } from "@mui/material";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";
// // import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// // import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// // import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// // import {
// //   useGetTestsByCourseForTeacherQuery,
// //   useLazyGetTestScoresQuery,
// // } from "../redux/slice/api/testApi";
// // import { StudentScore } from "../interface/Exam";

// // interface AggregatedScore {
// //   testTitle: string;
// //   averageScore: number;
// //   testId: string;
// // }

// // interface Props {
// //   courseName: string;
// // }

// // const CourseScoresChart = ({ courseName }: Props) => {
// //   const theme = useTheme();
// //   const [aggregatedScores, setAggregatedScores] = useState<AggregatedScore[]>([]);
// //   const [scoresByTest, setScoresByTest] = useState<Record<string, StudentScore[]>>({});
// //   const [expandedTestId, setExpandedTestId] = useState<string | null>(null);
// //   const [triggerGetTestScores] = useLazyGetTestScoresQuery();

// //   const { data: testsData, isLoading, isError } =useGetTestsByCourseForTeacherQuery(courseName);

// //   useEffect(() => {
// //     const fetchScores = async () => {
// //       if (!testsData?.tests) return;

// //       const scoresArray: AggregatedScore[] = [];
// //       const allScoresByTest: Record<string, StudentScore[]> = {};

// //       for (const test of testsData.tests) {
// //         try {
// //           const response = await triggerGetTestScores(test._id).unwrap();
// //           const scores: StudentScore[] = response.scores ?? []
// //           // const scores: StudentScore[] = (response ?? []).map((item) => ({
// //           // studentId: item.studentId,
// //           // scores: item.scores, // שימי לב להמרה בין השם 'scores' ל־ 'score'
// //           // userName: item.studentName ?? 'Unknown',
// //           // }));
// //           const average =
// //             scores.length > 0
// //               ? scores.reduce((sum, s) => sum + s.scores, 0) / scores.length
// //               : 0;
// //           scoresArray.push({ testTitle: test.title, averageScore: average, testId: test._id });
// //           allScoresByTest[test._id] = scores;
// //         } catch (err) {
// //           console.error("שגיאה בטעינת ציונים למבחן:", test.title, err);
// //           scoresArray.push({ testTitle: test.title, averageScore: 0, testId: test._id });
// //           allScoresByTest[test._id] = [];
// //         }
// //       }

// //       setAggregatedScores(scoresArray);
// //       setScoresByTest(allScoresByTest);
// //     };

// //     fetchScores();
// //   }, [testsData, triggerGetTestScores]);

// //   const handleExpandClick = (testId: string) => {
// //     setExpandedTestId((prev) => (prev === testId ? null : testId));
// //   };

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

// //   if (isLoading) {
// //     return <Typography>טוען מבחנים וציונים...</Typography>;
// //   }
// //   if (isError) {
// //     return <Typography color="error">שגיאה בטעינת הנתונים</Typography>;
// //   }

// //   return (
// //     <Card
// //       elevation={4}
// //       sx={{
// //         background: `linear-gradient(135deg, ${alpha(
// //           theme.palette.primary.main,
// //           0.02
// //         )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
// //         border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
// //         borderRadius: 3,
// //         overflow: "hidden",
// //         transition: "all 0.3s ease-in-out",
// //         "&:hover": {
// //           elevation: 8,
// //           transform: "translateY(-2px)",
// //           boxShadow: theme.shadows[8],
// //         },
// //       }}
// //     >
// //       <CardContent sx={{ p: 3 }}>
// //         {/* Header */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             alignItems: "center",
// //             mb: 3,
// //             pb: 2,
// //             borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               width: 48,
// //               height: 48,
// //               borderRadius: "50%",
// //               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
// //               mr: 2,
// //               boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
// //             }}
// //           >
// //             <TrendingUpIcon sx={{ color: "white", fontSize: 24 }} />
// //           </Box>
// //           <Box>
// //             <Typography
// //               variant="h5"
// //               component="h2"
// //               fontWeight="bold"
// //               sx={{
// //                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// //                 backgroundClip: "text",
// //                 WebkitBackgroundClip: "text",
// //                 WebkitTextFillColor: "transparent",
// //                 mb: 0.5,
// //               }}
// //             >
// //               מעקב ציונים
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
// //               גרף התקדמות הציונים הממוצעים במבחנים
// //             </Typography>
// //           </Box>
// //         </Box>

// //         {/* Chart Container */}
// //         <Box
// //           sx={{
// //             position: "relative",
// //             height: 340,
// //             p: 2,
// //             bgcolor: alpha(theme.palette.background.paper, 0.7),
// //             borderRadius: 2,
// //             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
// //             "&::before": {
// //               content: '""',
// //               position: "absolute",
// //               top: 0,
// //               left: 0,
// //               right: 0,
// //               bottom: 0,
// //               background: `radial-gradient(circle at 30% 20%, ${alpha(
// //                 theme.palette.primary.main,
// //                 0.05
// //               )}, transparent 50%)`,
// //               borderRadius: 2,
// //               pointerEvents: "none",
// //             },
// //           }}
// //         >
// //           <ResponsiveContainer width="100%" height="100%">
// //             <LineChart data={aggregatedScores} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
// //               <XAxis
// //                 dataKey="testTitle"
// //                 tick={{
// //                   fontSize: 12,
// //                   fill: theme.palette.text.secondary,
// //                   fontWeight: 500,
// //                 }}
// //                 axisLine={{
// //                   stroke: alpha(theme.palette.primary.main, 0.3),
// //                   strokeWidth: 2,
// //                 }}
// //                 tickLine={{
// //                   stroke: alpha(theme.palette.primary.main, 0.3),
// //                   strokeWidth: 1,
// //                 }}
// //                 angle={-45}
// //                 textAnchor="end"
// //                 height={80}
// //               />
// //               <YAxis
// //                 tick={{
// //                   fontSize: 12,
// //                   fill: theme.palette.text.secondary,
// //                   fontWeight: 500,
// //                 }}
// //                 axisLine={{
// //                   stroke: alpha(theme.palette.primary.main, 0.3),
// //                   strokeWidth: 2,
// //                 }}
// //                 tickLine={{
// //                   stroke: alpha(theme.palette.primary.main, 0.3),
// //                   strokeWidth: 1,
// //                 }}
// //                 domain={[0, 100]}
// //               />
// //               <Tooltip content={<CustomTooltip />} />
// //               <Legend
// //                 wrapperStyle={{
// //                   paddingTop: "20px",
// //                   fontSize: "14px",
// //                   fontWeight: 500,
// //                   color: theme.palette.text.primary,
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
// //                   r: 6,
// //                 }}
// //                 activeDot={{
// //                   r: 8,
// //                   fill: theme.palette.secondary.main,
// //                   stroke: theme.palette.background.paper,
// //                   strokeWidth: 3,
// //                 }}
// //                 name="ציון ממוצע"
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Box>

// //         {/* טבלה עם רשימת מבחנים וציונים ממוצעים */}
// //         <Box sx={{ mt: 4 }}>
// //           <Typography variant="h6" gutterBottom>
// //             רשימת מבחנים וציונים ממוצעים
// //           </Typography>

// //           <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
// //             <Table stickyHeader size="small" aria-label="מבחנים וציונים">
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell />
// //                   <TableCell>שם מבחן</TableCell>
// //                   <TableCell align="right">ציון ממוצע</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {aggregatedScores.map((test) => (
// //                   <React.Fragment key={test.testId}>
// //                     <TableRow hover>
// //                       <TableCell>
// //                         <IconButton
// //                           size="small"
// //                           onClick={() => handleExpandClick(test.testId)}
// //                           aria-label={expandedTestId === test.testId ? "הסתר ציוני תלמידות" : "הצג ציוני תלמידות"}
// //                         >
// //                           {expandedTestId === test.testId ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// //                         </IconButton>
// //                       </TableCell>
// //                       <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
// //                         {test.testTitle}
// //                       </TableCell>
// //                       <TableCell align="right">{test.averageScore.toFixed(2)}</TableCell>
// //                     </TableRow>

// //                     <TableRow>
// //                       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
// //                         <Collapse in={expandedTestId === test.testId} timeout="auto" unmountOnExit>
// //                           <Box sx={{ margin: 1 }}>
// //                             <Typography variant="subtitle1" gutterBottom component="div">
// //                               ציוני תלמידות
// //                             </Typography>
// //                             {scoresByTest[test.testId]?.length ? (
// //                               <Table size="small" aria-label="ציוני תלמידות">
// //                                 <TableHead>
// //                                   <TableRow>
// //                                     <TableCell>שם תלמידה</TableCell>
// //                                     <TableCell align="right">ציון</TableCell>
// //                                     <TableCell align="right">תאריך סיום</TableCell>
// //                                   </TableRow>
// //                                 </TableHead>
// //                                 <TableBody>
// //                                   {scoresByTest[test.testId].map((score) => (
// //                                     <TableRow key={score.studentId}>
// //                                       <TableCell>{score.userName}</TableCell>
// //                                       <TableCell align="right">{score.scores}</TableCell>
// //                                       <TableCell align="right">
// //                                         {score.finishedAt ? new Date(score.finishedAt).toLocaleDateString() : "-"}
// //                                       </TableCell>
// //                                     </TableRow>
// //                                   ))}
// //                                 </TableBody>
// //                               </Table>
// //                             ) : (
// //                               <Typography variant="body2" color="text.secondary">
// //                                 עדיין אין ציונים למבחן זה.
// //                               </Typography>
// //                             )}
// //                           </Box>
// //                         </Collapse>
// //                       </TableCell>
// //                     </TableRow>
// //                   </React.Fragment>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </Box>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default CourseScoresChart;



// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Paper,
//   useTheme,
//   alpha,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Collapse,
//   IconButton,
// } from "@mui/material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import {
//   useGetTestsByCourseForTeacherQuery,
//   useLazyGetTestScoresQuery,
// } from "../redux/slice/api/testApi";
// import { StudentScore } from "../interface/Exam";

// interface AggregatedScore {
//   testTitle: string;
//   averageScore: number;
//   testId: string;
// }

// interface Props {
//   courseName: string;
// }

// const CourseScoresChart = ({ courseName }: Props) => {
//   const theme = useTheme();
//   const [aggregatedScores, setAggregatedScores] = useState<AggregatedScore[]>([]);
//   const [scoresByTest, setScoresByTest] = useState<Record<string, StudentScore[]>>({});
//   const [expandedTestId, setExpandedTestId] = useState<string | null>(null);
//   const [triggerGetTestScores] = useLazyGetTestScoresQuery();

//   const { data: testsData, isLoading, isError } = useGetTestsByCourseForTeacherQuery(courseName);

//   useEffect(() => {
//     const fetchScores = async () => {
//       if (!testsData?.tests) return;

//       const scoresArray: AggregatedScore[] = [];
//       const allScoresByTest: Record<string, StudentScore[]> = {};

//       for (const test of testsData.tests) {
//         try {
//           const response = await triggerGetTestScores(test._id).unwrap();
//           const scores: StudentScore[] = response.scores ?? [];
//           const average =
//             scores.length > 0
//               ? scores.reduce((sum, s) => sum + s.scores, 0) / scores.length
//               : 0;
//           scoresArray.push({ testTitle: test.title, averageScore: average, testId: test._id });
//           allScoresByTest[test._id] = scores;
//         } catch (err) {
//           console.error("Error loading scores for test:", test.title, err);
//           scoresArray.push({ testTitle: test.title, averageScore: 0, testId: test._id });
//           allScoresByTest[test._id] = [];
//         }
//       }

//       setAggregatedScores(scoresArray);
//       setScoresByTest(allScoresByTest);
//     };

//     fetchScores();
//   }, [testsData, triggerGetTestScores]);

//   const handleExpandClick = (testId: string) => {
//     setExpandedTestId((prev) => (prev === testId ? null : testId));
//   };

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <Paper
//           elevation={8}
//           sx={{
//             p: 2,
//             bgcolor: alpha(theme.palette.background.paper, 0.95),
//             border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="body2" fontWeight="medium" color="text.primary">
//             {label}
//           </Typography>
//           <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
//             Average Score: {payload[0].value.toFixed(1)}
//           </Typography>
//         </Paper>
//       );
//     }
//     return null;
//   };

//   if (isLoading) {
//     return <Typography>Loading tests and scores...</Typography>;
//   }
//   if (isError) {
//     return <Typography color="error">Error loading data</Typography>;
//   }

//   return (
//     <Card
//       elevation={4}
//       sx={{
//         background: `linear-gradient(135deg, ${alpha(
//           theme.palette.primary.main,
//           0.02
//         )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
//         border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//         borderRadius: 3,
//         overflow: "hidden",
//         transition: "all 0.3s ease-in-out",
//         "&:hover": {
//           elevation: 8,
//           transform: "translateY(-2px)",
//           boxShadow: theme.shadows[8],
//         },
//       }}
//     >
//       <CardContent sx={{ p: 3 }}>
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             mb: 3,
//             pb: 2,
//             borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               width: 48,
//               height: 48,
//               borderRadius: "50%",
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               mr: 2,
//               boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
//             }}
//           >
//             <TrendingUpIcon sx={{ color: "white", fontSize: 24 }} />
//           </Box>
//           <Box>
//             <Typography
//               variant="h5"
//               component="h2"
//               fontWeight="bold"
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 mb: 0.5,
//               }}
//             >
//               Score Tracking
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//               Average test score progression graph
//             </Typography>
//           </Box>
//         </Box>

//         {/* Chart Container */}
//         <Box
//           sx={{
//             position: "relative",
//             height: 340,
//             p: 2,
//             bgcolor: alpha(theme.palette.background.paper, 0.7),
//             borderRadius: 2,
//             border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//             "&::before": {
//               content: '""',
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: `radial-gradient(circle at 30% 20%, ${alpha(
//                 theme.palette.primary.main,
//                 0.05
//               )}, transparent 50%)`,
//               borderRadius: 2,
//               pointerEvents: "none",
//             },
//           }}
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={aggregatedScores} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
//               <XAxis
//                 dataKey="testTitle"
//                 tick={{
//                   fontSize: 12,
//                   fill: theme.palette.text.secondary,
//                   fontWeight: 500,
//                 }}
//                 axisLine={{
//                   stroke: alpha(theme.palette.primary.main, 0.3),
//                   strokeWidth: 2,
//                 }}
//                 tickLine={{
//                   stroke: alpha(theme.palette.primary.main, 0.3),
//                   strokeWidth: 1,
//                 }}
//                 angle={-45}
//                 textAnchor="end"
//                 height={80}
//               />
//               <YAxis
//                 tick={{
//                   fontSize: 12,
//                   fill: theme.palette.text.secondary,
//                   fontWeight: 500,
//                 }}
//                 axisLine={{
//                   stroke: alpha(theme.palette.primary.main, 0.3),
//                   strokeWidth: 2,
//                 }}
//                 tickLine={{
//                   stroke: alpha(theme.palette.primary.main, 0.3),
//                   strokeWidth: 1,
//                 }}
//                 domain={[0, 100]}
//               />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend
//                 wrapperStyle={{
//                   paddingTop: "20px",
//                   fontSize: "14px",
//                   fontWeight: 500,
//                   color: theme.palette.text.primary,
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="averageScore"
//                 stroke={theme.palette.primary.main}
//                 strokeWidth={3}
//                 dot={{
//                   fill: theme.palette.primary.main,
//                   strokeWidth: 3,
//                   stroke: theme.palette.background.paper,
//                   r: 6,
//                 }}
//                 activeDot={{
//                   r: 8,
//                   fill: theme.palette.secondary.main,
//                   stroke: theme.palette.background.paper,
//                   strokeWidth: 3,
//                 }}
//                 name="Average Score"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Box>

//         {/* Table with test list and average scores */}
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             Test List and Average Scores
//           </Typography>

//           <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
//             <Table stickyHeader size="small" aria-label="Tests and Scores">
//               <TableHead>
//                 <TableRow>
//                   <TableCell />
//                   <TableCell>Test Name</TableCell>
//                   <TableCell align="right">Average Score</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {aggregatedScores.map((test) => (
//                   <React.Fragment key={test.testId}>
//                     <TableRow hover>
//                       <TableCell>
//                         <IconButton
//                           size="small"
//                           onClick={() => handleExpandClick(test.testId)}
//                           aria-label={
//                             expandedTestId === test.testId
//                               ? "Hide student scores"
//                               : "Show student scores"
//                           }
//                         >
//                           {expandedTestId === test.testId ? (
//                             <KeyboardArrowUpIcon />
//                           ) : (
//                             <KeyboardArrowDownIcon />
//                           )}
//                         </IconButton>
//                       </TableCell>
//                       <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
//                         {test.testTitle}
//                       </TableCell>
//                       <TableCell align="right">{test.averageScore.toFixed(1)}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell colSpan={3} sx={{ p: 0, borderBottom: 0 }}>
//                         <Collapse in={expandedTestId === test.testId} timeout="auto" unmountOnExit>
//                           <Box sx={{ m: 2 }}>
//                             <Typography variant="body2" fontWeight="bold" gutterBottom>
//                               Student Scores:
//                             </Typography>
//                             {scoresByTest[test.testId]?.length ? (
//                               <Table size="small">
//                                 <TableHead>
//                                   <TableRow>
//                                     <TableCell>Student Name</TableCell>
//                                     <TableCell align="right">Score</TableCell>
//                                   </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                   {scoresByTest[test.testId].map((s, i) => (
//                                     <TableRow key={i}>
//                                       <TableCell>{s.userName}</TableCell>
//                                       <TableCell align="right">{s.scores}</TableCell>
//                                     </TableRow>
//                                   ))}
//                                 </TableBody>
//                               </Table>
//                             ) : (
//                               <Typography variant="body2" color="text.secondary">
//                                 No scores available.
//                               </Typography>
//                             )}
//                           </Box>
//                         </Collapse>
//                       </TableCell>
//                     </TableRow>
//                   </React.Fragment>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseScoresChart;




import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  useTheme,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  useGetTestsByCourseForTeacherQuery,
  useLazyGetTestScoresQuery,
} from "../redux/slice/api/testApi";

// Type for average score per test
interface AggregatedScore {
  testTitle: string;
  averageScore: number;
  testId: string;
}

// Type for student score
interface StudentScore {
  studentId: string;
  userName: string;
  score: number;
  finishedAt?: string;
}

// Props to receive course name
interface Props {
  courseName: string;
}

const CourseScoresChart = ({ courseName }: Props) => {
  const theme = useTheme();

  // State to store average scores and student scores by test
  const [aggregatedScores, setAggregatedScores] = useState<AggregatedScore[]>([]);
  const [scoresByTest, setScoresByTest] = useState<Record<string, StudentScore[]>>({});
  const [expandedTestId, setExpandedTestId] = useState<string | null>(null);

  // Lazy query to get test scores
  const [triggerGetTestScores] = useLazyGetTestScoresQuery();

  // Query to get tests by course
  const { data: testsData, isLoading, isError } = useGetTestsByCourseForTeacherQuery(courseName);

  // Load scores when testsData or trigger changes
  useEffect(() => {
    const fetchScores = async () => {
      if (!testsData?.tests) return;

      const scoresArray: AggregatedScore[] = [];
      const allScoresByTest: Record<string, StudentScore[]> = {};

      for (const test of testsData.tests) {
        try {
          const response = await triggerGetTestScores(test._id).unwrap();
          const scores: StudentScore[] = response.scores ?? [];

          // Calculate average score
          const average =
            scores.length > 0
              ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length
              : 0;

          scoresArray.push({ testTitle: test.title, averageScore: average, testId: test._id });
          allScoresByTest[test._id] = scores;
        } catch (err) {
          console.error("Error loading scores for test:", test.title, err);
          scoresArray.push({ testTitle: test.title, averageScore: 0, testId: test._id });
          allScoresByTest[test._id] = [];
        }
      }

      setAggregatedScores(scoresArray);
      setScoresByTest(allScoresByTest);
    };

    fetchScores();
  }, [testsData, triggerGetTestScores]);

  // Toggle showing student scores for a specific test
  const handleExpandClick = (testId: string) => {
    setExpandedTestId((prev) => (prev === testId ? null : testId));
  };

  // Custom tooltip component for chart
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
            Average Score: {payload[0].value.toFixed(1)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  if (isLoading) {
    return <Typography>Loading tests and scores...</Typography>;
  }
  if (isError) {
    return <Typography color="error">Error loading data</Typography>;
  }

  return (
    <Card
      elevation={4}
      sx={{
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          elevation: 8,
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            pb: 2,
            borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              mr: 2,
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <TrendingUpIcon sx={{ color: "white", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 0.5,
              }}
            >
              Score Tracking
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Average score progression chart for tests
            </Typography>
          </Box>
        </Box>

        {/* Chart container */}
        <Box
          sx={{
            position: "relative",
            height: 340,
            p: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 30% 20%, ${alpha(
                theme.palette.primary.main,
                0.05
              )}, transparent 50%)`,
              borderRadius: 2,
              pointerEvents: "none",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aggregatedScores} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis
                dataKey="testTitle"
                tick={{
                  fontSize: 12,
                  fill: theme.palette.text.secondary,
                  fontWeight: 500,
                }}
                axisLine={{
                  stroke: alpha(theme.palette.primary.main, 0.3),
                  strokeWidth: 2,
                }}
                tickLine={{
                  stroke: alpha(theme.palette.primary.main, 0.3),
                  strokeWidth: 1,
                }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{
                  fontSize: 12,
                  fill: theme.palette.text.secondary,
                  fontWeight: 500,
                }}
                axisLine={{
                  stroke: alpha(theme.palette.primary.main, 0.3),
                  strokeWidth: 2,
                }}
                tickLine={{
                  stroke: alpha(theme.palette.primary.main, 0.3),
                  strokeWidth: 1,
                }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: theme.palette.text.primary,
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
                  r: 6,
                }}
                activeDot={{
                  r: 8,
                  fill: theme.palette.secondary.main,
                  stroke: theme.palette.background.paper,
                  strokeWidth: 3,
                }}
                name="Average Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Table with list of tests and average scores */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            List of Tests and Average Scores
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table stickyHeader size="small" aria-label="Tests and Scores">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Test Name</TableCell>
                  <TableCell align="right">Average Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aggregatedScores.map((test) => (
                  <React.Fragment key={test.testId}>
                    <TableRow hover>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleExpandClick(test.testId)}
                          aria-label={expandedTestId === test.testId ? "Hide student scores" : "Show student scores"}
                        >
                          {expandedTestId === test.testId ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {test.testTitle}
                      </TableCell>
                      <TableCell align="right">{test.averageScore.toFixed(2)}</TableCell>
                    </TableRow>

                    {/* Collapsible row for student scores */}
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                        <Collapse in={expandedTestId === test.testId} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle1" gutterBottom component="div">
                              Student Scores
                            </Typography>
                            <Table size="small" aria-label="student scores">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Student Name</TableCell>
                                  <TableCell align="right">Score</TableCell>
                                  <TableCell align="right">Finished At</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {(scoresByTest[test.testId] ?? []).map((score) => (
                                  <TableRow key={score.studentId}>
                                    <TableCell>{score.userName}</TableCell>
                                    <TableCell align="right">{score.score}</TableCell>
                                    <TableCell align="right">
                                      {score.finishedAt ? new Date(score.finishedAt).toLocaleString() : "-"}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseScoresChart;
