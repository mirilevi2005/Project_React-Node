
// // import Box from '@mui/material/Box';
// // import Paper from '@mui/material/Paper';
// // import { Typography } from '@mui/material';
// // import { Link } from 'react-router-dom';  // תיקון היבוא
// // import '../css/HomeLacturer.css';  // כולל את ה-CSS החיצוני
// // import papersData from '../data/HomeLacturerData';  // ייבוא הנתונים

// // interface PaperItem {
// //   link: string;
// //   image: string;
// //   title: string;
// //   courseName: string; // ✅ חובה אם את משתמשת בזה בקוד
// // }

// // const HomePagelacturer= () => {
// //   return (
// //     <div>
// //       <label>"Advance the field of Computer Science"</label>
// //       <Box className="container">
// //         {papersData.map((item: PaperItem, index: number) => (
// //           <Link key={index} to={`/HomeLacturer/${item.link}`}>
// //             <Paper 
// //               className="paper" 
// //               elevation={3}
// //               style={{
// //                 backgroundImage: `url(${item.image})`  /* הוספת התמונה כרקע */
// //               }}
// //             >
// //               <div className="paper-content">
// //                 {/* הצגת כותרת */}
// //                 <Typography variant="h6">{item.title}</Typography>
// //               </div>
// //             </Paper>
// //           </Link>
// //         ))}
// //       </Box>
// //     </div>
// //   );
// // }

// // export default HomePagelacturer;


// // HomePageLecturer.tsx
// import { Box, Typography, Card, CardContent, CardMedia, Container, Chip } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import papersData from '../data/HomeLacturerData';
// import '../css/HomeLacturer.css';

// // הגדרת טיפוס לנתוני הקורס
// interface CourseItem {
//   title: string;
//   desc: string;
//   body: string;
//   image: string;
//   link: string;
//   courseName: string;
// }

// // תמונות רקע ייעודיות לכל קורס
// const backgroundImages: Record<string, string> = {
//   "AI": "https://images.unsplash.com/photo-1677442135437-f13c4e14051d?auto=format&fit=crop&q=80&w=1032&ixlib=rb-4.0.3",
//   "CYBER": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
//   "CLOUD": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3"
// };

// const HomePagelecturer = () => {
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ mb: 6, textAlign: 'center' }}>
//         <Typography 
//           variant="h4" 
//           component="h2" 
//           sx={{ 
//             fontWeight: 'bold', 
//             color: '#1e3a8a',
//             mb: 2
//           }}
//           className="course-title"
//         >
//           קורסים שלי
//         </Typography>
        
//         <Typography 
//           variant="h6" 
//           sx={{ 
//             fontStyle: 'italic', 
//             color: '#475569',
//             maxWidth: '600px',
//             mx: 'auto'
//           }}
//           className="header-quote"
//         >
//           "Advance the field of Computer Science"
//         </Typography>
//       </Box>

//       <Box 
//         sx={{ 
//           display: 'grid', 
//           gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
//           gap: 4,
//           direction: 'rtl'
//         }}
//         className="course-card-container animate-fade-in"
//       >
//         {papersData.map((course: CourseItem, index: number) => (
//           <Link 
//             key={index} 
//             to={`/HomeLacturer/${course.link}`}
//             style={{ textDecoration: 'none' }}
//           >
//             <Card 
//               elevation={hoveredCard === index ? 8 : 3}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//               sx={{ 
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'transform 0.3s, box-shadow 0.3s',
//                 transform: hoveredCard === index ? 'translateY(-8px)' : 'none',
//                 borderRadius: 2,
//                 overflow: 'hidden',
//                 '&:hover': {
//                   cursor: 'pointer'
//                 }
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="160"
//                 image={backgroundImages[course.courseName] || course.image}
//                 alt={course.title}
//                 sx={{
//                   objectFit: 'cover'
//                 }}
//               />
              
//               <CardContent sx={{ flexGrow: 1, p: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
//                   <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#334155' }}>
//                     {course.title}
//                   </Typography>
                  
//                   <Chip 
//                     label={course.courseName} 
//                     size="small" 
//                     sx={{ 
//                       bgcolor: 
//                         course.courseName === 'AI' ? '#dbeafe' : 
//                         course.courseName === 'CYBER' ? '#fee2e2' : 
//                         '#dcfce7',
//                       color: 
//                         course.courseName === 'AI' ? '#1e40af' : 
//                         course.courseName === 'CYBER' ? '#b91c1c' : 
//                         '#166534',
//                       fontWeight: 'medium'
//                     }} 
//                   />
//                 </Box>

//                 <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//                   {course.desc}
//                 </Typography>
                
//                 <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
//                   {course.body}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default HomePagelecturer;






// // HomePageLecturer.tsx
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Box, 
//   Typography, 
//   Card, 
//   CardContent, 
//   CardMedia, 
//   Container, 
//   Chip, 
//   Grid, 
//   Paper, 
//   Divider,
//   Button,
//   Stack
// } from '@mui/material';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import GroupIcon from '@mui/icons-material/Group';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import FolderOpenIcon from '@mui/icons-material/FolderOpen';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import papersData from '../data/HomeLacturerData';
// import { styled } from '@mui/material/styles';

// // הגדרת טיפוס לנתוני הקורס
// interface CourseItem {
//   title: string;
//   desc: string;
//   body: string;
//   image: string;
//   link: string;
//   courseName: string;
// }

// // סגנונות מתקדמים באמצעות styled-components
// const StyledCourseCard = styled(Card)(({ theme }) => ({
//   height: '100%',
//   display: 'flex',
//   flexDirection: 'column',
//   transition: 'transform 0.3s, box-shadow 0.3s',
//   borderRadius: theme.spacing(2),
//   overflow: 'hidden',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: theme.shadows[10],
//     cursor: 'pointer'
//   }
// }));

// const SectionTitle = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold', 
//   color: '#1e3a8a',
//   marginBottom: theme.spacing(2),
//   position: 'relative',
//   paddingBottom: theme.spacing(2),
//   '&:after': {
//     content: '""',
//     position: 'absolute',
//     left: 0,
//     bottom: 0,
//     width: '60px',
//     height: '4px',
//     backgroundColor: '#3b82f6',
//     borderRadius: '2px'
//   }
// }));

// const QuickStatCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   display: 'flex',
//   alignItems: 'center',
//   borderRadius: theme.spacing(2),
//   height: '100%',
//   transition: 'all 0.3s',
//   '&:hover': {
//     transform: 'translateY(-5px)',
//     boxShadow: theme.shadows[5]
//   }
// }));

// const StatIcon = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   width: 50,
//   height: 50,
//   borderRadius: '50%',
//   backgroundColor: '#e0f2fe',
//   marginRight: theme.spacing(2),
//   color: '#3b82f6'
// }));

// // תמונות רקע ייעודיות לכל קורס - עדכון עם קישורים פעילים
// const backgroundImages: Record<string, string> = {
//   "AI": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "CYBER": "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "CLOUD": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// };

// // נתונים לסטטיסטיקות מהירות
// const quickStats = [
//   { icon: <GroupIcon sx={{ fontSize: 28 }} />, title: "סטודנטים פעילים", value: "127", color: "#dbeafe" },
//   { icon: <AutoStoriesIcon sx={{ fontSize: 28 }} />, title: "סך קורסים", value: "3", color: "#f0fdf4" },
//   { icon: <DateRangeIcon sx={{ fontSize: 28 }} />, title: "סמסטר נוכחי", value: "אביב 2025", color: "#fef3c7" },
//   { icon: <TrendingUpIcon sx={{ fontSize: 28 }} />, title: "אחוז השתתפות", value: "94%", color: "#fee2e2" }
// ];

// // נתונים למשימות מתוזמנות
// const upcomingEvents = [
//   { title: "מסירת מטלה - AI", course: "AI", date: "25 במאי, 2025", daysTill: 5 },
//   { title: "בוחן אמצע - Cyber Security", course: "CYBER", date: "1 ביוני, 2025", daysTill: 12 },
//   { title: "הרצאת אורח", course: "CLOUD", date: "3 ביוני, 2025", daysTill: 14 }
// ];

// const HomePagelecturer = ()=> {
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);

//   const currentDate = new Date().toLocaleDateString('he-IL', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* תאריך עכשווי */}
//       <Typography 
//         variant="body1" 
//         sx={{ 
//           textAlign: 'left', 
//           mb: 3, 
//           color: '#64748b',
//           fontWeight: 500
//         }}
//         dir="rtl"
//       >
//         {currentDate}
//       </Typography>

//       {/* כותרת הדף וציטוט */}
//       <Box sx={{ mb: 6, textAlign: 'center' }}>
//         <SectionTitle 
//           variant="h4" 
//           component="h2"
//           sx={{ textAlign: 'center' }}
//         >
//           קורסים שלי
//         </SectionTitle>
        
//         <Typography 
//           variant="h6" 
//           sx={{ 
//             fontStyle: 'italic', 
//             color: '#475569',
//             maxWidth: '600px',
//             mx: 'auto',
//             mt: 2
//           }}
//         >
//           "Advance the field of Computer Science"
//         </Typography>
//       </Box>

//       {/* סטטיסטיקות מהירות */}
//       <Grid container spacing={3} sx={{ mb: 6 }}>
//         {quickStats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <QuickStatCard elevation={2}>
//               <StatIcon sx={{ bgcolor: stat.color }}>
//                 {stat.icon}
//               </StatIcon>
//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {stat.title}
//                 </Typography>
//                 <Typography variant="h6" fontWeight="bold">
//                   {stat.value}
//                 </Typography>
//               </Box>
//             </QuickStatCard>
//           </Grid>
//         ))}
//       </Grid>

//       {/* רשימת הקורסים */}
//       <Box 
//         sx={{ 
//           display: 'grid', 
//           gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
//           gap: 4,
//           direction: 'rtl',
//           mb: 6
//         }}
//       >
//         {papersData.map((course: CourseItem, index: number) => (
//           <Link 
//             key={index} 
//             to={`/HomeLacturer/${course.link}`}
//             style={{ textDecoration: 'none' }}
//           >
//             <StyledCourseCard 
//               elevation={hoveredCard === index ? 8 : 3}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <CardMedia
//                 component="img"
//                 height="180"
//                 image={backgroundImages[course.courseName] || course.image}
//                 alt={course.title}
//                 sx={{
//                   objectFit: 'cover'
//                 }}
//               />
              
//               <CardContent sx={{ flexGrow: 1, p: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
//                   <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#334155' }}>
//                     {course.title}
//                   </Typography>
                  
//                   <Chip 
//                     label={course.courseName} 
//                     size="small" 
//                     sx={{ 
//                       bgcolor: 
//                         course.courseName === 'AI' ? '#dbeafe' : 
//                         course.courseName === 'CYBER' ? '#fee2e2' : 
//                         '#dcfce7',
//                       color: 
//                         course.courseName === 'AI' ? '#1e40af' : 
//                         course.courseName === 'CYBER' ? '#b91c1c' : 
//                         '#166534',
//                       fontWeight: 'medium'
//                     }} 
//                   />
//                 </Box>

//                 <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//                   {course.desc}
//                 </Typography>
                
//                 <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
//                   {course.body}
//                 </Typography>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
//                     <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                     <Typography variant="caption">
//                       12 שיעורים
//                     </Typography>
//                   </Box>
                  
//                   <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
//                     <GroupIcon sx={{ fontSize: 16, mr: 0.5 }} />
//                     <Typography variant="caption">
//                       {course.courseName === 'AI' ? '45' : 
//                        course.courseName === 'CYBER' ? '38' : '44'} סטודנטים
//                     </Typography>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </StyledCourseCard>
//           </Link>
//         ))}
//       </Box>

//       {/* אירועים מתוזמנים */}
//       <Grid container spacing={4} sx={{ mt: 2 }}>
//         {/* לוח משימות מתוזמנות */}
//         <Grid item xs={12} md={8}>
//           <Paper 
//             elevation={2} 
//             sx={{ 
//               p: 3, 
//               borderRadius: 2,
//               height: '100%'
//             }}
//           >
//             <SectionTitle variant="h5" component="h3">
//               משימות קרובות
//             </SectionTitle>
            
//             <Stack spacing={2} sx={{ mt: 3 }}>
//               {upcomingEvents.map((event, index) => (
//                 <Paper 
//                   key={index} 
//                   elevation={1} 
//                   sx={{ 
//                     p: 2, 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'space-between',
//                     borderRadius: 1.5,
//                     bgcolor: event.daysTill <= 7 ? '#fff1f2' : '#ffffff'
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <FolderOpenIcon sx={{ color: 
//                       event.course === 'AI' ? '#1e40af' : 
//                       event.course === 'CYBER' ? '#b91c1c' : 
//                       '#166534',
//                       mr: 2
//                     }} />
//                     <Box>
//                       <Typography variant="body1" fontWeight="medium">
//                         {event.title}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {event.date}
//                       </Typography>
//                     </Box>
//                   </Box>
                  
//                   <Chip 
//                     label={event.daysTill <= 7 ? `${event.daysTill} ימים נותרו` : event.course} 
//                     size="small"
//                     color={event.daysTill <= 7 ? "error" : "default"}
//                     variant={event.daysTill <= 7 ? "outlined" : "filled"}
//                     sx={{ 
//                       fontWeight: 'medium',
//                       bgcolor: event.daysTill > 7 ? 
//                         event.course === 'AI' ? '#dbeafe' : 
//                         event.course === 'CYBER' ? '#fee2e2' : 
//                         '#dcfce7' : 'transparent'
//                     }}
//                   />
//                 </Paper>
//               ))}
//             </Stack>
            
//             <Button 
//               variant="text" 
//               sx={{ 
//                 mt: 3, 
//                 color: '#3b82f6',
//                 fontWeight: 'medium',
//                 '&:hover': {
//                   backgroundColor: 'rgba(59, 130, 246, 0.04)'
//                 }
//               }}
//             >
//               צפה בכל המשימות
//             </Button>
//           </Paper>
//         </Grid>
        
//         {/* לוח השראה ומשאבים */}
//         <Grid item xs={12} md={4}>
//           <Paper 
//             elevation={2} 
//             sx={{ 
//               p: 3, 
//               borderRadius: 2,
//               background: 'linear-gradient(135deg, #172554 0%, #1e40af 100%)',
//               color: 'white',
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column'
//             }}
//           >
//             <Typography 
//               variant="h5" 
//               component="h3" 
//               sx={{ 
//                 fontWeight: 'bold',
//                 mb: 3,
//                 position: 'relative',
//                 paddingBottom: 2,
//                 '&:after': {
//                   content: '""',
//                   position: 'absolute',
//                   left: 0,
//                   bottom: 0,
//                   width: '40px',
//                   height: '3px',
//                   backgroundColor: '#60a5fa',
//                   borderRadius: '2px'
//                 }
//               }}
//             >
//               משאבים חדשים
//             </Typography>
            
//             <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
//               הספרייה שלנו מתעדכנת תדיר עם חומרי לימוד חדשים, מאמרים וכלים שימושיים למרצים.
//             </Typography>
            
//             <Box sx={{ 
//               mt: 2,
//               p: 2,
//               borderRadius: 1.5,
//               bgcolor: 'rgba(255, 255, 255, 0.1)',
//               mb: 2
//             }}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
//                 מדריך – הוראה אפקטיבית בתחום הסייבר
//               </Typography>
//               <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
//                 פורסם אתמול • 15 דקות קריאה
//               </Typography>
//             </Box>
            
//             <Box sx={{ 
//               p: 2,
//               borderRadius: 1.5,
//               bgcolor: 'rgba(255, 255, 255, 0.1)',
//               mb: 'auto'
//             }}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
//                 וובינר – כלי AI חדשים להוראה
//               </Typography>
//               <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
//                 25 במאי, 2025 • 19:00
//               </Typography>
//             </Box>
            
//             <Button 
//               variant="contained" 
//               sx={{ 
//                 mt: 3,
//                 bgcolor: 'white',
//                 color: '#1e40af',
//                 '&:hover': {
//                   bgcolor: '#f8fafc'
//                 },
//                 fontWeight: 'medium'
//               }}
//             >
//               עיון בספרייה
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default HomePagelecturer;

















// HomePageLecturer.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Container, 
  Chip, 
  Grid, 
  Paper, 
  Button,
  Stack
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BarChartIcon from '@mui/icons-material/BarChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import papersData from '../data/HomeLacturerData';
import { styled } from '@mui/material/styles';
import axios from 'axios'; // Assuming you're using axios for API calls

// Course item type definition
interface CourseItem {
  title: string;
  desc: string;
  body: string;
  image: string;
  link: string;
  courseName: string;
}

// Stats type definitions
interface CourseStats {
  totalStudents: number;
  totalCourses: number;
  totalVideos: number;
  viewPercentage: number;
}

// Advanced styles using styled-components
const StyledCourseCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: 16,
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer'
  }
});

const SectionTitle = styled(Typography)({
  fontWeight: 'bold', 
  color: '#1e3a8a',
  marginBottom: 16,
  position: 'relative',
  paddingBottom: 16,
  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '60px',
    height: '4px',
    backgroundColor: '#3b82f6',
    borderRadius: '2px'
  }
});

const QuickStatCard = styled(Paper)({
  padding: 16,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 16,
  height: '100%',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
  }
});

const StatIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: '#e0f2fe',
  marginRight: 16,
  color: '#3b82f6'
});

// Background images for each course
const backgroundImages: Record<string, string> = {
  "AI": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "CYBER": "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "CLOUD": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Upcoming assignments/events data
const upcomingEvents = [
  { title: "Assignment submission - AI", course: "AI", date: "May 25, 2025", daysTill: 5 },
  { title: "Midterm Quiz - Cyber Security", course: "CYBER", date: "June 1, 2025", daysTill: 12 },
  { title: "Guest Lecture", course: "CLOUD", date: "June 3, 2025", daysTill: 14 }
];

const HomePageLecturer = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [stats, setStats] = useState<CourseStats>({
    totalStudents: 0,
    totalCourses: 3,
    totalVideos: 0,
    viewPercentage: 0
  });

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get current semester based on date
  const getCurrentSemester = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    
    if (month >= 1 && month <= 5) return `Spring ${year}`;
    if (month >= 6 && month <= 7) return `Summer ${year}`;
    return `Fall ${year}`;
  };

  // Fetch statistics from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/lecturer/stats');
        setStats({
          totalStudents: response.data.totalStudents || 127,
          totalCourses: response.data.totalCourses || 3,
          totalVideos: response.data.totalVideos || 36,
          viewPercentage: response.data.viewPercentage || 94
        });
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
        // Use fallback data if API fails
        setStats({
          totalStudents: 127,
          totalCourses: 3,
          totalVideos: 36,
          viewPercentage: 94
        });
      }
    };

    fetchStats();
  }, []);

  // Quick stats data
  const quickStats = [
    { 
      icon: <GroupIcon sx={{ fontSize: 28 }} />, 
      title: "Active Students", 
      value: stats.totalStudents.toString(), 
      color: "#dbeafe" 
    },
    { 
      icon: <VideoLibraryIcon sx={{ fontSize: 28 }} />, 
      title: "Total Videos", 
      value: stats.totalVideos.toString(), 
      color: "#f0fdf4" 
    },
    { 
      icon: <DateRangeIcon sx={{ fontSize: 28 }} />, 
      title: "Current Semester", 
      value: getCurrentSemester(), 
      color: "#fef3c7" 
    },
    { 
      icon: <TrendingUpIcon sx={{ fontSize: 28 }} />, 
      title: "Participation Rate", 
      value: `${stats.viewPercentage}%`, 
      color: "#fee2e2" 
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Current date */}
      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: 'right', 
          mb: 3, 
          color: '#64748b',
          fontWeight: 500
        }}
      >
        {currentDate}
      </Typography>

      {/* Page title and quote */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        {/* <SectionTitle 
          variant="h4" 
          sx={{ textAlign: 'center' ,}}
        > */}
          My Courses
        {/* </SectionTitle> */}
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontStyle: 'italic', 
            color: '#475569',
            maxWidth: '600px',
            mx: 'auto',
            mt: 2
          }}
        >
          "Advance the field of Computer Science"
        </Typography>
      </Box>

      {/* Quick statistics */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <QuickStatCard elevation={2}>
              <StatIcon sx={{ bgcolor: stat.color }}>
                {stat.icon}
              </StatIcon>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Box>
            </QuickStatCard>
          </Grid>
        ))}
      </Grid>

      {/* Course list */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 6
        }}
      >
        {papersData.map((course: CourseItem, index: number) => (
          <Link 
            key={index} 
            to={`/HomeLacturer/${course.link}`}
            style={{ textDecoration: 'none' }}
          >
            <StyledCourseCard 
              elevation={hoveredCard === index ? 8 : 3}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardMedia
                component="img"
                height="180"
                image={backgroundImages[course.courseName] || course.image}
                alt={course.title}
                sx={{
                  objectFit: 'cover'
                }}
              />
              
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#334155' }}>
                    {course.title}
                  </Typography>
                  
                  <Chip 
                    label={course.courseName} 
                    size="small" 
                    sx={{ 
                      bgcolor: 
                        course.courseName === 'AI' ? '#dbeafe' : 
                        course.courseName === 'CYBER' ? '#fee2e2' : 
                        '#dcfce7',
                      color: 
                        course.courseName === 'AI' ? '#1e40af' : 
                        course.courseName === 'CYBER' ? '#b91c1c' : 
                        '#166534',
                      fontWeight: 'medium'
                    }} 
                  />
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {course.desc}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  {course.body}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
                    <VideoLibraryIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption">
                      12 videos
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
                    <BarChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption">
                      {course.courseName === 'AI' ? '96%' : 
                       course.courseName === 'CYBER' ? '88%' : '92%'} participation
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </StyledCourseCard>
          </Link>
        ))}
      </Box>

      {/* Grid with upcoming assignments and analytics */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Upcoming assignments */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%'
            }}
          >
            <SectionTitle variant="h5">
              Upcoming Tasks
            </SectionTitle>
            
            <Stack spacing={2} sx={{ mt: 3 }}>
              {upcomingEvents.map((event, index) => (
                <Paper 
                  key={index} 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    borderRadius: 1.5,
                    bgcolor: event.daysTill <= 7 ? '#fff1f2' : '#ffffff'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FolderOpenIcon sx={{ color: 
                      event.course === 'AI' ? '#1e40af' : 
                      event.course === 'CYBER' ? '#b91c1c' : 
                      '#166534',
                      mr: 2
                    }} />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {event.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.date}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip 
                    label={event.daysTill <= 7 ? `${event.daysTill} days left` : event.course} 
                    size="small"
                    color={event.daysTill <= 7 ? "error" : "default"}
                    variant={event.daysTill <= 7 ? "outlined" : "filled"}
                    sx={{ 
                      fontWeight: 'medium',
                      bgcolor: event.daysTill > 7 ? 
                        event.course === 'AI' ? '#dbeafe' : 
                        event.course === 'CYBER' ? '#fee2e2' : 
                        '#dcfce7' : 'transparent'
                    }}
                  />
                </Paper>
              ))}
            </Stack>
            
            <Button 
              variant="text" 
              component={Link}
              to="/tasks"
              sx={{ 
                mt: 3, 
                color: '#3b82f6',
                fontWeight: 'medium',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.04)'
                }
              }}
            >
              View All Tasks
            </Button>
          </Paper>
        </Grid>
        
        {/* Analytics dashboard link */}
        <Grid item xs={12} md={4}>
          <Paper 
            component={Link}
            to="/analytics"
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #172554 0%, #1e40af 100%)',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none'
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold',
                mb: 3,
                position: 'relative',
                paddingBottom: 2,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#60a5fa',
                  borderRadius: '2px'
                }
              }}
            >
              Analytics Dashboard
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Track student engagement, view performance metrics, and gain insights to improve your courses.
            </Typography>
            
            <Box sx={{ 
              mt: 2,
              p: 2,
              borderRadius: 1.5,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}>
              <AnalyticsIcon sx={{ mr: 1.5 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Student Engagement
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
                  Understand how students interact with your content
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              p: 2,
              borderRadius: 1.5,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              mb: 'auto',
              display: 'flex',
              alignItems: 'center'
            }}>
              <BarChartIcon sx={{ mr: 1.5 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Performance Metrics
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
                  Get detailed insights on course performance
                </Typography>
              </Box>
            </Box>
            
            <Button 
              variant="contained" 
              sx={{ 
                mt: 3,
                bgcolor: 'white',
                color: '#1e40af',
                '&:hover': {
                  bgcolor: '#f8fafc'
                },
                fontWeight: 'medium'
              }}
            >
              Open Analytics
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePageLecturer;