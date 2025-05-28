// HomePage.tsx
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
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BarChartIcon from '@mui/icons-material/BarChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import papersData from '../data/HomeLacturerData';
import { styled } from '@mui/material/styles';
import { useGetCourseStatsQuery, useGetVideosCountQuery } from '../redux/slice/api/userApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slice/authStateSlice';
import NewContentPopup from './student/NewContentPopup';

// Course item type definition
interface CourseItem {
  title: string;
  desc: string;
  body: string;
  image: string;
  link: string;
  courseName: string;
  courseNameSee:string
}
type VideoInfo = {
  name: string;
  videos: number;
};

// Stats type definitions
interface CourseStats {
  totalStudents: number;
  totalCourses: number;
  totalVideos: number;
  viewPercentage: number;
  videos:VideoInfo[];
}

// Updated styles for modern card design
const StyledCourseCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: 24, // Increased border radius for modern look
  overflow: 'hidden',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', // Softer shadow
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
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

// Updated QuickStatCard with modern design
const QuickStatCard = styled(Paper)({
  padding: 24, // Increased padding
  display: 'flex',
  alignItems: 'center',
  borderRadius: 20, // More rounded corners
  height: '100%',
  transition: 'all 0.3s',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)', // Softer shadow
  backgroundColor: '#ffffff',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
  }
});

const StatIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56, // Slightly larger
  height: 56,
  borderRadius: '50%',
  marginRight: 16,
});

// Background images for each course
const backgroundImages: Record<string, string> = {
  "Ai": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "CyberSecurity": "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "CloudComputing": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};

// Upcoming assignments/events data
const upcomingEvents = [
  { title: "Assignment submission - AI", course: "ai", date: "May 25, 2025", daysTill: 5 },
  { title: "Midterm Quiz - Cyber Security", course: "CyberSecurity", date: "June 1, 2025", daysTill: 12 },
  { title: "Guest Lecture", course: "CloudComputing", date: "June 3, 2025", daysTill: 14 }
];

const HomePage= () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [stats, setStats] = useState<CourseStats>({
    totalStudents: 0,
    totalCourses: 3,
    totalVideos: 0,
    viewPercentage: 0,
    videos: []  // חדש
  });
// const courseNames = papersData.length > 0 ? papersData.map(paper => paper.courseName) : [];
const { data: dataAi, error: errorAi, isLoading: loadingAi } = useGetVideosCountQuery('Ai');
const { data: dataCloudComputing, error: errorCloudComputing, isLoading: loadingCloudComputing } = useGetVideosCountQuery('CloudComputing');
const { data: dataCyberSecurity, error: errorCyberSecurity, isLoading: loadingCyberSecurity } = useGetVideosCountQuery('CyberSecurity');
const { data, error: error, isLoading: loading } = useGetCourseStatsQuery();
console.log(dataAi+"dataAi");
console.log(dataCloudComputing+"dataCloudComputing");
console.log("dataAi:", dataAi);
console.log("errorAi:", errorAi);
console.log("isLoadingAi:", loadingAi);


    const user=useSelector(selectCurrentUser)
    console.log(user?.roles);

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
 useEffect(() => {
    if (data) {
      setStats({
        totalStudents: data.studentsCount || 130,
        totalCourses: 3, // אם לא מגיע מהשרת, תשאיר קבוע או תוסיף ל-API
        totalVideos: data.videos || 36,
        viewPercentage: 94, // אותו דבר כמו למעלה
        videos: Array.isArray(data.videos) ? data.videos : []      });
    }
  }, [data]);

  // Get current semester based on date
  const getCurrentSemester = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    
    if (month >= 1 && month <= 5) return `Spring ${year}`;
    if (month >= 6 && month <= 7) return `Summer ${year}`;
    return `Fall ${year}`;
  };

  // Quick stats data with updated colors and icons
  const quickStats = [
    { 
      icon: <GroupIcon sx={{ fontSize: 28, color: '#3b82f6' }} />, 
      title: "Active Students", 
      value: stats.totalStudents.toString(), 
      bgColor: "#e0f2fe" 
    },
    { 
      icon: <VideoLibraryIcon sx={{ fontSize: 28, color: '#3b82f6' }} />, 
      title: "Total Videos", 
      value: stats.totalVideos.toString(), 
      bgColor: "#e0f2fe" 
    },
    { 
      icon: <DateRangeIcon sx={{ fontSize: 28, color: '#f59e0b' }} />, 
      title: "Current Semester", 
      value: getCurrentSemester(), 
      bgColor: "#fef3c7" 
    },
    { 
      icon: <TrendingUpIcon sx={{ fontSize: 28, color: '#3b82f6' }} />, 
      title: "Participation Rate", 
      value: `${stats.viewPercentage}%`, 
      bgColor: "#fce7f3" 
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {user?.roles==='student'? <NewContentPopup/> : null }
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
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold',
            color: '#1e293b',
            mb: 2
          }}
        >
          My Courses
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontStyle: 'italic', 
            color: '#475569',
            maxWidth: '600px',
            mx: 'auto',
            fontWeight: 400
          }}
        >
          "Advance the field of Computer Science"
        </Typography>
      </Box>

      {/* Quick statistics with updated modern design */}
      <Grid container spacing={3} sx={{ mb: 15 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <QuickStatCard elevation={0}>
              <StatIcon sx={{ backgroundColor: stat.bgColor }}>
                {stat.icon}
              </StatIcon>
              <Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#64748b',
                    fontWeight: 500,
                    mb: 0.5
                  }}
                >
                  {stat.title}
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#1e293b'
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>
            </QuickStatCard>
          </Grid>
        ))}
      </Grid>

      

      {/* Course list with updated design */}
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
              elevation={0}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardMedia
                component="img"
                height="200"
                image={backgroundImages[course.courseName] || course.image}
                alt={course.title}
                sx={{
                  objectFit: 'cover'
                }}
              />
              
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#1e293b',
                      fontSize: '1.3rem'
                    }}
                  >
                    {course.title}
                  </Typography>
                  
                  <Chip 
                    label={course.courseNameSee} 
                    size="small" 
                    sx={{ 
                      bgcolor: 
                        course.courseName === 'Ai' ? '#dbeafe' : 
                        course.courseName === 'CyberSecurity' ? '#fee2e2' : 
                        '#dcfce7',
                      color: 
                        course.courseName === 'Ai' ? '#1e40af' : 
                        course.courseName === 'CyberSecurity' ? '#b91c1c' : 
                        '#166534',
                      fontWeight: 'medium',
                      borderRadius: '12px',
                      fontSize: '0.75rem'
                    }} 
                  />
                </Box>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#64748b', 
                    mb: 2,
                    lineHeight: 1.6
                  }}
                >
                  {course.desc}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8', 
                    fontStyle: 'italic',
                    mb: 3
                  }}
                >
                  {course.body}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
                    <VideoLibraryIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                   
  {(course.courseName === 'Ai' && dataAi) ||
   (course.courseName === 'CyberSecurity' && dataCyberSecurity) ||
   (course.courseName === 'CloudComputing' && dataCloudComputing) || 0} videos
</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
                    <BarChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {course.courseName === 'Ai' ? '96%' : 
                       course.courseName === 'CyberSecurity' ? '88%' : '92%'} participation
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
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 3,
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
            }}
          >
            <SectionTitle variant="h5">
              Upcoming Tasks
            </SectionTitle>
            
            <Stack spacing={2} sx={{ mt: 3 }}>
              {upcomingEvents.map((event, index) => (
                <Paper 
                  key={index} 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    bgcolor: event.daysTill <= 7 ? '#fff1f2' : '#ffffff',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FolderOpenIcon sx={{ color: 
                      event.course === 'Ai' ? '#1e40af' : 
                      event.course === 'CyberSecurity' ? '#b91c1c' : 
                      '#166534',
                      mr: 2
                    }} />
                    <Box>
                      <Typography variant="body1" fontWeight="medium" sx={{ color: '#1e293b' }}>
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
                      borderRadius: '12px',
                      bgcolor: event.daysTill > 7 ? 
                        event.course === 'ai' ? '#dbeafe' : 
                        event.course === 'CyberSecurity' ? '#fee2e2' : 
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
                borderRadius: '12px',
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
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #172554 0%, #1e40af 100%)',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
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
              borderRadius: 2,
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
              borderRadius: 2,
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
                borderRadius: '12px',
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

export default HomePage;







