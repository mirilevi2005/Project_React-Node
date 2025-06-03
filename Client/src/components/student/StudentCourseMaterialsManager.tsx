// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Box,
//   CircularProgress,
//   Alert,
//   Divider,
//   Snackbar,
//   useTheme,
// } from '@mui/material';
// import {
//   VideoLibrary as VideoIcon,
//   CalendarToday as CalendarTodayIcon,
//   Visibility as VisibilityIcon,
// } from '@mui/icons-material';
// import { useGetAllMaterialsByNameCourseQuery } from '../../redux/slice/api/materialsApi';
// import { Video } from '../../interface/VideoMaterial';

// // interface Props {
// //   courseName: string;
// // }

// // const StudentCourseMaterialsManager= ({ courseName }:Props) => {
//  const StudentCourseMaterialsManager= () => {

//   const urlParts = window.location.pathname.split("/");
//   const courseName = urlParts[urlParts.length - 1];
//   const theme = useTheme();
//   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
//   const [activePanel, setActivePanel] = useState<'videos' | null>(null);
//   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   const isVideoValid = (date: string | Date) => new Date(date) > new Date();
//   const videos: Video[] = data?.videos || [];

//   const toggleExpandVideo = (video: Video) => {
//     if (!isVideoValid(video.finishDate)) {
//       setShowSnackbar(true);
//       return;
//     }
//     setExpandedVideo(prev => (prev === video._id ? null : video._id));
//   };

//   const formatDate = (dateString: string | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('he-IL', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   if (isLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   if (isError) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="error" sx={{ my: 2 }}>
//           שגיאה בטעינת הסרטונים. נסה שוב מאוחר יותר.
//         </Alert>
//       </Container>
//     );
//   }

//   if (videos.length === 0) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="info" sx={{ my: 2 }}>
//           אין סרטונים זמינים בקורס זה.
//         </Alert>
//       </Container>
//     );
//   }

//   const renderVideoContent = () => (
//     <Grid container spacing={3}>
//       {videos.map((video) => {
//         const finishDate = new Date(video.finishDate);
//         const isExpired = new Date() > finishDate;

//         return (
//           <Grid item xs={12} key={video._id}>
//             <Card
//               variant="outlined"
//               sx={{
//                 borderRadius: 2,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                 },
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h6">{video.videoName}</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                   <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
//                   <Typography variant="caption" color="text.secondary">
//                     זמין עד: {formatDate(finishDate)}
//                   </Typography>
//                 </Box>
//               </CardContent>

//               {expandedVideo === video._id && (
//                 <>
//                   <Divider />
//                   <Box
//                     sx={{
//                       position: 'relative',
//                       paddingTop: '56.25%',
//                       backgroundColor: '#000',
//                       borderRadius: 1,
//                       overflow: 'hidden',
//                       mx: 2,
//                       mb: 2,
//                     }}
//                   >
//                     <Box
//                       component="video"
//                       sx={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover',
//                       }}
//                       controls={!isExpired}
//                       style={{ pointerEvents: isExpired ? 'none' : 'auto' }}
//                     >
//                       <source
//                         src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
//                         type="video/mp4"
//                       />
//                       הדפדפן שלך לא תומך בווידאו.
//                     </Box>

//                     {isExpired && (
//                       <Box
//                         sx={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           bgcolor: 'rgba(0,0,0,0.5)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           color: '#fff',
//                           fontSize: 18,
//                           fontWeight: 'bold',
//                           textAlign: 'center',
//                           pointerEvents: 'none',
//                         }}
//                       >
//                         הצפייה אינה זמינה — תאריך פג
//                       </Box>
//                     )}
//                   </Box>
//                 </>
//               )}

//               <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
//                 <Box
//                   onClick={() => toggleExpandVideo(video)}
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: isExpired ? 'not-allowed' : 'pointer',
//                     p: 1,
//                     borderRadius: 1,
//                     '&:hover': {
//                       backgroundColor: isExpired ? 'transparent' : 'action.hover',
//                     },
//                   }}
//                 >
//                   <VisibilityIcon
//                     sx={{
//                       color: isExpired ? '#9e9e9e' : 'primary.main',
//                       fontSize: 24
//                     }}
//                   />
//                 </Box>
//               </CardActions>
//             </Card>
//           </Grid>
//         );
//       })}
//     </Grid>
//   );

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card
//             sx={{
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'transform 0.2s',
//               '&:hover': { transform: 'translateY(-5px)' },
//               border: activePanel === 'videos' ? `2px solid ${theme.palette.primary.main}` : 'none',
//             }}
//           >
//             <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//               <VideoIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//               <Typography variant="h6">סרטוני לימוד</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 צפייה בסרטוני הקורס
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button
//                 fullWidth
//                 variant={activePanel === 'videos' ? 'contained' : 'outlined'}
//                 onClick={() => setActivePanel(activePanel === 'videos' ? null : 'videos')}
//               >
//                 {activePanel === 'videos' ? 'הסתר' : 'הצג סרטונים'}
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>

//       </Grid>

//       <Box sx={{ mt: 4 }}>
//         {activePanel === 'videos' && renderVideoContent()}
//       </Box>

//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         message="לא ניתן לצפות — הסרטון כבר לא זמין"
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       />
//     </Container>
//   );
// };

// export default StudentCourseMaterialsManager;

// ////רק הצגת סרטונים ומבחנים בלי תוגן
// import  { useState } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Typography,
//   Box,
//   Snackbar,
// } from '@mui/material';
// import VideoIcon from '@mui/icons-material/OndemandVideo';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { useTheme } from '@mui/material/styles';
// import VideoList from './VideoList';
// import TestForStudent from './TestForStudent';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '../../redux/slice/authStateSlice';
// import NewContentPopup from './NewContentPopup';

// const StudentCourseMaterialsManager = () => {
//   const theme = useTheme();
//   const [activePanel, setActivePanel] = useState<'videos' | 'tests' | null>(null);
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   const urlParts = window.location.pathname.split("/");
//   const courseName = urlParts[urlParts.length - 1];

//    const student = useSelector(selectCurrentUser);
//    console.log(student);
//    const studentId = student?._id ;
//   const renderVideoContent = () => {
//     return (
//       <Box>
//         {/* כאן הקוד שלך להצגת סרטונים */}
//         {/* <Typography>כאן יוצגו סרטוני הלימוד</Typography> */}
//         <VideoList courseName={courseName}/>
//       </Box>
//     );
//   };

//   const renderTestContent = () => {
//     return (
//       <Box>
//         {/* כאן הקוד שלך להצגת מבחנים */}
//         {/* <Typography>כאן יוצגו המבחנים</Typography> */}
//      <TestForStudent courseName={courseName} studentId={student?._id!} />
//       </Box>
//     );
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card
//             sx={{
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'transform 0.2s',
//               '&:hover': { transform: 'translateY(-5px)' },
//               border: activePanel === 'videos' ? `2px solid ${theme.palette.primary.main}` : 'none',
//             }}
//           >
//             <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//               <VideoIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//               <Typography variant="h6">סרטוני לימוד</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 צפייה בסרטוני הקורס
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button
//                 fullWidth
//                 variant={activePanel === 'videos' ? 'contained' : 'outlined'}
//                 onClick={() => setActivePanel(activePanel === 'videos' ? null : 'videos')}
//               >
//                 {activePanel === 'videos' ? 'הסתר' : 'הצג סרטונים'}
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card
//             sx={{
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'transform 0.2s',
//               '&:hover': { transform: 'translateY(-5px)' },
//               border: activePanel === 'tests' ? `2px solid ${theme.palette.primary.main}` : 'none',
//             }}
//           >
//             <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//               <CalendarTodayIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//               <Typography variant="h6">מבחנים</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 צפייה במבחנים
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button
//                 fullWidth
//                 variant={activePanel === 'tests' ? 'contained' : 'outlined'}
//                 onClick={() => setActivePanel(activePanel === 'tests' ? null : 'tests')}
//               >
//                 {activePanel === 'tests' ? 'הסתר' : 'הצג מבחנים'}
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box sx={{ mt: 4 }}>
//         {activePanel === 'videos' && renderVideoContent()}
//         {activePanel === 'tests' && renderTestContent()}
//       </Box>

//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         message="לא ניתן לצפות — הסרטון כבר לא זמין"
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       />
//       <NewContentPopup/>

//     </Container>

//   );
// };

// export default StudentCourseMaterialsManager;

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slice/authStateSlice";
import VideoList from "./VideoList";
import TestForStudent from "./TestForStudent";
import NewContentPopup from "./NewContentPopup";
import StudentCourseScoresChart from "./StudentCourseScoresChart";

const StudentCourseMaterialsManager = () => {
  const theme = useTheme();
  const [activePanel, setActivePanel] = useState<"videos" | "tests" | "chart" | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const urlParts = window.location.pathname.split("/");
  const courseName = urlParts[urlParts.length - 1];
  const student = useSelector(selectCurrentUser);
  const studentId = student?._id;
  const togglePanel = (panel: "videos" | "tests" | "chart") => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const renderContent = () => {
    switch (activePanel) {
      case "videos":
        return <VideoList courseName={courseName} />;
      case "tests":
        return (
          <TestForStudent courseName={courseName} studentId={studentId!} />
        );
      case "chart":
        // StudentCourseMaterialsManager.tsx
        const StudentCourseMaterialsManager = ({
          courseName,
          studentId,
        }: {
          courseName: string;
          studentId?: string;
        }) => {
          if (!studentId) {
            return <div>טוען פרטי סטודנט...</div>;
          }
          return (
            <StudentCourseScoresChart
              courseName={courseName}
              studentId={studentId}
            />
          );
        };

        return (
          <StudentCourseScoresChart
            courseName={courseName}
            studentId={studentId!}
          />
        );
      default:
        return null;
    }
  };

  const cardStyle = (panel: string) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
    "&:hover": { transform: "translateY(-5px)" },
    border:
      activePanel === panel
        ? `2px solid ${theme.palette.primary.main}`
        : "none",
  });

  const buttonVariant = (panel: string) =>
    activePanel === panel ? "contained" : "outlined";

  const buttonText = (panel: string) => {
    if (activePanel === panel) return "הסתר";
    switch (panel) {
      case "videos":
        return "הצג סרטונים";
      case "tests":
        return "הצג מבחנים";
      case "chart":
        return "הצג גרף";
      default:
        return "";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* כרטיסיית סרטונים */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle("videos")}>
            <CardContent sx={{ textAlign: "center" }}>
              <VideoIcon
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h6">סרטוני לימוד</Typography>
              <Typography variant="body2">צפייה בסרטוני הקורס</Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant={buttonVariant("videos")}
                onClick={() => togglePanel("videos")}
              >
                {buttonText("videos")}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* כרטיסיית מבחנים */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle("tests")}>
            <CardContent sx={{ textAlign: "center" }}>
              <CalendarTodayIcon
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h6">מבחנים</Typography>
              <Typography variant="body2">צפייה במבחנים</Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant={buttonVariant("tests")}
                onClick={() => togglePanel("tests")}
              >
                {buttonText("tests")}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* כרטיסיית גרף ציונים */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle("chart")}>
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUpIcon
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h6">גרף ציונים</Typography>
              <Typography variant="body2">
                השוואת ציוני התלמידה לממוצע
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant={buttonVariant("chart")}
                onClick={() => togglePanel("chart")}
              >
                {buttonText("chart")}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>{renderContent()}</Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="לא ניתן לצפות — הסרטון כבר לא זמין"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <NewContentPopup />
    </Container>
  );
};

export default StudentCourseMaterialsManager;

///עובד לי הצגת מבחנים

// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Box,
//   CircularProgress,
//   Alert,
//   Divider,
//   Snackbar,
//   useTheme,
// } from '@mui/material';
// import {
//   VideoLibrary as VideoIcon,
//   CalendarToday as CalendarTodayIcon,
//   Visibility as VisibilityIcon,
// } from '@mui/icons-material';
// import { useGetAllMaterialsByNameCourseQuery } from '../../redux/slice/api/materialsApi';
// import { Video } from '../../interface/VideoMaterial';

// const StudentCourseMaterialsManager = () => {
//   const urlParts = window.location.pathname.split("/");
//   const courseName = urlParts[urlParts.length - 1];
//   const theme = useTheme();
//   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
//   const [activePanel, setActivePanel] = useState<'videos' | 'tests' | null>(null);
//   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   const isVideoValid = (date: string | Date) => new Date(date) > new Date();
//   const videos: Video[] = data?.videos || [];

//   const toggleExpandVideo = (video: Video) => {
//     if (!isVideoValid(video.finishDate)) {
//       setShowSnackbar(true);
//       return;
//     }
//     setExpandedVideo(prev => (prev === video._id ? null : video._id));
//   };

//   const formatDate = (dateString: string | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('he-IL', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   if (isLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   if (isError) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="error" sx={{ my: 2 }}>
//           שגיאה בטעינת הסרטונים. נסה שוב מאוחר יותר.
//         </Alert>
//       </Container>
//     );
//   }

//   const renderVideoContent = () => (
//     <Grid container spacing={3}>
//       {videos.length === 0 ? (
//         <Grid item xs={12}>
//           <Alert severity="info">אין סרטונים זמינים בקורס זה.</Alert>
//         </Grid>
//       ) : (
//         videos.map((video) => {
//           const finishDate = new Date(video.finishDate);
//           const isExpired = new Date() > finishDate;

//           return (
//             <Grid item xs={12} key={video._id}>
//               <Card
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 2,
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">{video.videoName}</Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
//                     <Typography variant="caption" color="text.secondary">
//                       זמין עד: {formatDate(finishDate)}
//                     </Typography>
//                   </Box>
//                 </CardContent>

//                 {expandedVideo === video._id && (
//                   <>
//                     <Divider />
//                     <Box
//                       sx={{
//                         position: 'relative',
//                         paddingTop: '56.25%',
//                         backgroundColor: '#000',
//                         borderRadius: 1,
//                         overflow: 'hidden',
//                         mx: 2,
//                         mb: 2,
//                       }}
//                     >
//                       <Box
//                         component="video"
//                         sx={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           objectFit: 'cover',
//                         }}
//                         controls={!isExpired}
//                         style={{ pointerEvents: isExpired ? 'none' : 'auto' }}
//                       >
//                         <source
//                           src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
//                           type="video/mp4"
//                         />
//                         הדפדפן שלך לא תומך בווידאו.
//                       </Box>

//                       {isExpired && (
//                         <Box
//                           sx={{
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             width: '100%',
//                             height: '100%',
//                             bgcolor: 'rgba(0,0,0,0.5)',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: '#fff',
//                             fontSize: 18,
//                             fontWeight: 'bold',
//                             textAlign: 'center',
//                             pointerEvents: 'none',
//                           }}
//                         >
//                           הצפייה אינה זמינה — תאריך פג
//                         </Box>
//                       )}
//                     </Box>
//                   </>
//                 )}

//                 <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
//                   <Box
//                     onClick={() => toggleExpandVideo(video)}
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       cursor: isExpired ? 'not-allowed' : 'pointer',
//                       p: 1,
//                       borderRadius: 1,
//                       '&:hover': {
//                         backgroundColor: isExpired ? 'transparent' : 'action.hover',
//                       },
//                     }}
//                   >
//                     <VisibilityIcon
//                       sx={{
//                         color: isExpired ? '#9e9e9e' : 'primary.main',
//                         fontSize: 24
//                       }}
//                     />
//                   </Box>
//                 </CardActions>
//               </Card>
//             </Grid>
//           );
//         })
//       )}
//     </Grid>
//   );

//   // כאן ניתן להוסיף את הלוגיקה להצגת מבחנים
//   const renderTestContent = () => (
//     <Box>
//       <Typography variant="h6" gutterBottom>
//         כאן יוצגו המבחנים
//       </Typography>
//       {/* תוסיף כאן את הקוד שלך להצגת מבחנים */}
//     </Box>
//   );

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card
//             sx={{
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'transform 0.2s',
//               '&:hover': { transform: 'translateY(-5px)' },
//               border: activePanel === 'videos' ? `2px solid ${theme.palette.primary.main}` : 'none',
//             }}
//           >
//             <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//               <VideoIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//               <Typography variant="h6">סרטוני לימוד</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 צפייה בסרטוני הקורס
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button
//                 fullWidth
//                 variant={activePanel === 'videos' ? 'contained' : 'outlined'}
//                 onClick={() => setActivePanel(activePanel === 'videos' ? null : 'videos')}
//               >
//                 {activePanel === 'videos' ? 'הסתר' : 'הצג סרטונים'}
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card
//             sx={{
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'transform 0.2s',
//               '&:hover': { transform: 'translateY(-5px)' },
//               border: activePanel === 'tests' ? `2px solid ${theme.palette.primary.main}` : 'none',
//             }}
//           >
//             <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//               <CalendarTodayIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//               <Typography variant="h6">מבחנים</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 צפייה במבחנים
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button
//                 fullWidth
//                 variant={activePanel === 'tests' ? 'contained' : 'outlined'}
//                 onClick={() => setActivePanel(activePanel === 'tests' ? null : 'tests')}
//               >
//                 {activePanel === 'tests' ? 'הסתר' : 'הצג מבחנים'}
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box sx={{ mt: 4 }}>
//         {activePanel === 'videos' && renderVideoContent()}
//         {activePanel === 'tests' && renderTestContent()}
//       </Box>

//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         message="לא ניתן לצפות — הסרטון כבר לא זמין"
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       />
//     </Container>
//   );
// };

// export default StudentCourseMaterialsManager;
``;
