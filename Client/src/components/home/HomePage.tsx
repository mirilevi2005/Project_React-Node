import { useState, useEffect } from 'react';
import { Container } from '@mui/material'; // Link מ-react-router-dom מיובא בתוך CourseDisplayCard
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DateRangeIcon from '@mui/icons-material/DateRange';

// Data
import papersData from '../../data/HomeLacturerData'; // התאם נתיב אם צריך

// Redux
import { useGetCourseStatsQuery, useGetVideosCountQuery } from '../../redux/slice/api/userApi'; // התאם נתיב אם צריך
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/slice/authStateSlice'; // התאם נתיב אם צריך

// Child Components & Types
import PageHeader from './PageHeader'; // התאם נתיב אם צריך
import QuickStatsSection from './QuickStatsSection'; // התאם נתיב אם צריך
import CourseListSection from './CourseListSection'; // התאם נתיב אם צריך
import { CourseStatsData, QuickStat } from '../../interface/HomePage'; // התאם נתיב אם צריך
import {userInfo}from '../../interface/authTypes'
// Other Components (נתיבים אלו צריכים להיות נכונים בפרויקט שלך)
// ודא שהנתיבים הללו נכונים בפרויקט שלך
import NewContentPopup from '../student/NewContentPopup'; // לדוגמה: '../student/NewContentPopup' אם HomePage בתיקיית pages
import ExpiringMaterialsAndTests from '../ExpiringMaterialsAndTests'; // לדוגמה: '../ExpiringMaterialsAndTests'

// קומפוננטות שמיובאות אך לא בשימוש בקוד שסיפקת:
// import UpcomingStudentTasks from './ExpiringMaterialsAndTests';
// import ExistingTestsManagement from './test/ExistingTestsManagement';


const HomePage = () => {
  const [_hoveredCard, setHoveredCard] = useState<number | null>(null); // _hoveredCard אם לא בשימוש ישיר ב-JSX
  const [stats, setStats] = useState<CourseStatsData>({ // השתמש ב-CourseStatsData מהטיפוסים שהוגדרו
    totalStudents: 0,
    totalCourses: 3, // זה נראה כערך ברירת מחדל או מציין מקום
    totalVideos: 0,
    viewPercentage: 0,
    videos: []
  });

  const user = useSelector(selectCurrentUser) as userInfo | null; // הוספת טיפוס למשתמש

  // RTK Query hooks לספירת וידאו בכל קורס
  const { data: dataAi, isLoading: loadingAi } = useGetVideosCountQuery('Ai');
  const { data: dataCloudComputing, isLoading: loadingCloudComputing } = useGetVideosCountQuery('CloudComputing');
  const { data: dataCyberSecurity, isLoading: loadingCyberSecurity } = useGetVideosCountQuery('CyberSecurity');
  
  // RTK Query hook לסטטיסטיקות קורסים כלליות
  // שונה השם של data ל-courseStatsApiData למניעת התנגשות עם data מה-useEffect הקודם
  const { data: courseStatsApiData, isLoading: loadingCourseStats } = useGetCourseStatsQuery();

  useEffect(() => {
    if (courseStatsApiData) {
      setStats({
        totalStudents: courseStatsApiData.studentsCount || 130, 
        totalCourses: 3, 
        totalVideos: courseStatsApiData.videos  || 36, 
        viewPercentage:94,
        // viewPercentage: courseStatsApiData.viewPercentage || 94, // בהנחה שזה קבוע או אמור להגיע מה-API
        videos: Array.isArray(courseStatsApiData.videos) ? courseStatsApiData.videos : []
      });
    }
  }, [courseStatsApiData]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getCurrentSemester = () => {
    const now = new Date();
    const month = now.getMonth(); 
    const year = now.getFullYear();
    if (month >= 1 && month <= 5) return `Spring ${year}`; 
    if (month >= 6 && month <= 7) return `Summer ${year}`; 
    return `Fall ${year}`;
  };

  // יצירת מערך הסטטיסטיקות המהירות
  const quickStatsList: QuickStat[] = [
    {
      icon: <GroupIcon sx={{ fontSize: 28, color: '#3b82f6' }} />,
      title: "Active Students",
      value: loadingCourseStats ? "טוען..." : stats.totalStudents.toString(),
      bgColor: "#e0f2fe"
    },
    {
      icon: <VideoLibraryIcon sx={{ fontSize: 28, color: '#3b82f6' }} />,
      title: "Total Videos",
      value: loadingCourseStats ? "טוען..." : stats.totalVideos.toString(),
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
      value: loadingCourseStats ? "טוען..." : `${stats.viewPercentage}%`,
      bgColor: "#fce7f3" 
    }
  ];

  // הכנת נתוני ספירת וידאו ואחוזי השתתפות עבור CourseListSection
  const videoCountsPerCourse = {
    Ai: loadingAi ? "..." : (dataAi || 0),
    CyberSecurity: loadingCyberSecurity ? "..." : (dataCyberSecurity || 0),
    CloudComputing: loadingCloudComputing ? "..." : (dataCloudComputing || 0),
  };

  const participationRatesPerCourse = { // נתונים אלו היו מקודדים ב-JSX המקורי
    Ai: '96%',
    CyberSecurity: '88%',
    CloudComputing: '92%',
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {user?.roles === 'student' ? <NewContentPopup /> : null}
      
      <PageHeader currentDate={currentDate} />
      
      <QuickStatsSection quickStats={quickStatsList} />
      
      <CourseListSection
        courses={papersData}
        videoCounts={videoCountsPerCourse}
        participationRates={participationRatesPerCourse}
        onSetHoveredCard={setHoveredCard} 
      />
      
      {/* קומפוננטה זו נוספה בקטע הקוד האחרון של HomePage.tsx שסיפקת */}
      <ExpiringMaterialsAndTests /> 

    </Container>
  );
};

export default HomePage;