import React from 'react';
import { Box } from '@mui/material';
import CourseDisplayCard from './CourseDisplayCard';
import { CourseItem } from '../../interface/HomePage';

interface CourseListSectionProps {
  courses: CourseItem[]; // זהו papersData
  videoCounts: { // מחושב מנתוני RTK Query עבור כל קורס
    Ai: number | string;
    CyberSecurity: number | string;
    CloudComputing: number | string;
  };
  participationRates: { // היה מקודד במקור, צריך לעבור כ-prop
    Ai: string;
    CyberSecurity: string;
    CloudComputing: string;
  };
  onSetHoveredCard: (index: number | null) => void;
}

const CourseListSection: React.FC<CourseListSectionProps> = ({
  courses,
  videoCounts,
  participationRates,
  onSetHoveredCard,
}) => {
  // פונקציות עזר לקבלת הנתונים הספציפיים לכל קורס
  const getVideoCountForCourse = (courseName: string): number | string => {
    if (courseName === 'Ai') return videoCounts.Ai;
    if (courseName === 'CyberSecurity') return videoCounts.CyberSecurity;
    if (courseName === 'CloudComputing') return videoCounts.CloudComputing;
    return 0; // ערך ברירת מחדל או מצב טעינה
  };

  const getParticipationRateForCourse = (courseName: string): string => {
    if (courseName === 'Ai') return participationRates.Ai;
    if (courseName === 'CyberSecurity') return participationRates.CyberSecurity;
    if (courseName === 'CloudComputing') return participationRates.CloudComputing;
    return 'N/A'; // ערך ברירת מחדל
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
        />
      ))}
    </Box>
  );
};

export default CourseListSection;