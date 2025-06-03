import { useSelector } from 'react-redux';
import VideoOfMaterialStudent from '../../components/student/VideoOfMaterialStudent';
import { selectCurrentUser } from '../../redux/slice/authStateSlice';
import VideoOfMaterialLacturer from '../../components/video/VideoOfMaterialLacturer';
import LecturerCourseMaterialsManager from '../../components/LecturerCourseMaterialsManager';
import StudentCourseMaterialsManager from '../../components/student/StudentCourseMaterialsManager';

const Ai = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <h1>Welcome to Ai course</h1>
      {user?.roles === 'lecturer' ? (
        // <VideoOfMaterialLacturer />
        <LecturerCourseMaterialsManager/>
      ) : (
        // <VideoOfMaterialStudent />
        <StudentCourseMaterialsManager />

      )}
    </div>
  );
};

export default Ai;
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   Divider,
//   useTheme
// } from '@mui/material';
// import {
//   VideoLibrary as VideoIcon,
//   Quiz as QuizIcon,
//   Assessment as AssessmentIcon,
//   BarChart as ChartIcon
// } from '@mui/icons-material';
// // import VideoOfMaterial from '../../components/video/VideoOfMaterial';
// // import VideoOfMaterialStudent from '../../components/student/VideoOfMaterial';
// import { selectCurrentUser } from '../../redux/slice/authStateSlice';
// import VideoList from '../../components/video/VideoList';

// const Ai: React.FC = () => {
//   const user = useSelector(selectCurrentUser);
//   const theme = useTheme();
  
//   // States for control panel visibility
//   const [showVideos, setShowVideos] = useState<boolean>(false);
//   const [showCreateTest, setShowCreateTest] = useState<boolean>(false);
//   const [showTests, setShowTests] = useState<boolean>(false);
//   const [showGrades, setShowGrades] = useState<boolean>(false);

//   const handleToggleVideos = () => {
//     setShowVideos(!showVideos);
//     setShowCreateTest(false);
//     setShowTests(false);
//     setShowGrades(false);
//   };

//   const handleToggleCreateTest = () => {
//     setShowCreateTest(!showCreateTest);
//     setShowVideos(false);
//     setShowTests(false);
//     setShowGrades(false);
//   };

//   const handleToggleTests = () => {
//     setShowTests(!showTests);
//     setShowVideos(false);
//     setShowCreateTest(false);
//     setShowGrades(false);
//   };

//   const handleToggleGrades = () => {
//     setShowGrades(!showGrades);
//     setShowVideos(false);
//     setShowCreateTest(false);
//     setShowTests(false);
//   };

//   // Determine which component to render
//   const getContent = () => {
//     if (user?.roles === 'lacturer') {
//       return <VideoOfMaterial />;
//     } else {
//       return <VideoOfMaterialStudent />;
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper 
//         elevation={3} 
//         sx={{ 
//           p: 3, 
//           mb: 4, 
//           borderRadius: 2,
//           background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
//           color: 'white'
//         }}
//       >
//         <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
//           קורס בינה מלאכותית
//         </Typography>
//         <Typography variant="subtitle1">
//           ברוכים הבאים לקורס בינה מלאכותית! כאן תוכלו לצפות בתכני הקורס, מבחנים וציונים.
//         </Typography>
//       </Paper>

//       {user?.roles === 'lacturer' && (
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card 
//               sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 transition: 'transform 0.2s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//                 border: showVideos ? `2px solid ${theme.palette.primary.main}` : 'none'
//               }}
//             >
//               <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//                 <VideoIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" component="h2">
//                   סרטוני לימוד
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   צפייה וניהול סרטוני הקורס
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button 
//                   fullWidth 
//                   variant={showVideos ? "contained" : "outlined"} 
//                   onClick={handleToggleVideos}
//                 >
//                   {showVideos ? 'הסתר סרטונים' : 'הצג סרטונים'}
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card 
//               sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 transition: 'transform 0.2s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//                 border: showCreateTest ? `2px solid ${theme.palette.primary.main}` : 'none'
//               }}
//             >
//               <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//                 <QuizIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" component="h2">
//                   יצירת מבחן
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   הוספת מבחן חדש לתלמידים
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button 
//                   fullWidth 
//                   variant={showCreateTest ? "contained" : "outlined"} 
//                   onClick={handleToggleCreateTest}
//                 >
//                   {showCreateTest ? 'הסתר טופס' : 'צור מבחן'}
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card 
//               sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 transition: 'transform 0.2s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//                 border: showTests ? `2px solid ${theme.palette.primary.main}` : 'none'
//               }}
//             >
//               <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//                 <AssessmentIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" component="h2">
//                   מבחנים קיימים
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   צפייה וניהול כל המבחנים
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button 
//                   fullWidth 
//                   variant={showTests ? "contained" : "outlined"} 
//                   onClick={handleToggleTests}
//                 >
//                   {showTests ? 'הסתר מבחנים' : 'הצג מבחנים'}
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card 
//               sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 transition: 'transform 0.2s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//                 border: showGrades ? `2px solid ${theme.palette.primary.main}` : 'none'
//               }}
//             >
//               <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//                 <ChartIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" component="h2">
//                   ציוני תלמידים
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   צפייה בציוני התלמידים
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button 
//                   fullWidth 
//                   variant={showGrades ? "contained" : "outlined"} 
//                   onClick={handleToggleGrades}
//                 >
//                   {showGrades ? 'הסתר ציונים' : 'הצג ציונים'}
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         </Grid>
//       )}

//       <Box sx={{ mt: 4 }}>
//         {getContent()}
//       </Box>
//     </Container>
//   );
// };

// export default Ai;
