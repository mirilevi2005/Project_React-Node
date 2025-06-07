import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../src/redux/store';
import CourseDisplayCard from './CourseDisplayCard';
import { CourseItem } from '../../interface/HomePage';

interface Props {
  courses: CourseItem[];
  videoCounts: {
    Ai: number | string;
    CyberSecurity: number | string;
    CloudComputing: number | string;
  };
  participationRates: {
    Ai: string;
    CyberSecurity: string;
    CloudComputing: string;
  };
  onSetHoveredCard: (index: number | null) => void;
}

const CourseListSection = ({courses,videoCounts, participationRates,onSetHoveredCard}:Props) => {
  const user = useSelector((state: RootState) => state.userInfo.user);
  const basePath = user?.roles === 'student' ? '/HomeStudent' : '/HomeLecturer';
  const getVideoCountForCourse = (courseName: string): number | string => {
    if (courseName === 'Ai') return videoCounts.Ai;
    if (courseName === 'CyberSecurity') return videoCounts.CyberSecurity;
    if (courseName === 'CloudComputing') return videoCounts.CloudComputing;
    return 0;
  };

  const getParticipationRateForCourse = (courseName: string): string => {
    if (courseName === 'Ai') return participationRates.Ai;
    if (courseName === 'CyberSecurity') return participationRates.CyberSecurity;
    if (courseName === 'CloudComputing') return participationRates.CloudComputing;
    return 'N/A';
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 4,
        mb: 6
      }}
    >
      {courses.map((course, index) => (
        <CourseDisplayCard
          key={index}
          course={course}
          videoCount={getVideoCountForCourse(course.courseName)}
          participationRate={getParticipationRateForCourse(course.courseName)}
          onMouseEnter={() => onSetHoveredCard(index)}
          onMouseLeave={() => onSetHoveredCard(null)}
          linkTo={`${basePath}/${course.link}`} 
        />
      ))}
    </Box>
  );
};
export default CourseListSection;
