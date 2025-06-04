import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // כדי לא להתנגש עם MUI Link
import { Box, Typography, CardContent, CardMedia, Chip, Link } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BarChartIcon from '@mui/icons-material/BarChart';
import { StyledCourseCard, backgroundImages } from '../styles/HomePage'
import { CourseItem } from '../../interface/HomePage';

interface Props {
  course: CourseItem;
  videoCount: number | string;
  participationRate: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  linkTo: string;
}

const CourseDisplayCard=({ course,videoCount,participationRate,onMouseEnter,onMouseLeave,linkTo,}:Props)=>{
  const chipBgColor =
    course.courseName === 'Ai' ? '#dbeafe' :
    course.courseName === 'CyberSecurity' ? '#fee2e2' :
    '#dcfce7';

  const chipColor =
    course.courseName === 'Ai' ? '#1e40af' :
    course.courseName === 'CyberSecurity' ? '#b91c1c' :
    '#166534';

  return (
    <Link
      component={RouterLink}
      to={linkTo} 
      sx={{ textDecoration: 'none' }}
    >
      <StyledCourseCard
        elevation={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <CardMedia
          component="img"
          height="200"
          image={backgroundImages[course.courseName] || course.image}
          alt={course.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1.3rem' }}>
              {course.title}
            </Typography>
            <Chip
              label={course.courseNameSee}
              size="small"
              sx={{
                bgcolor: chipBgColor,
                color: chipColor,
                fontWeight: 'medium',
                borderRadius: '12px',
                fontSize: '0.75rem'
              }}
            />
          </Box>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 2, lineHeight: 1.6 }}>
            {course.desc}
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic', mb: 3 }}>
            {course.body}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
              <VideoLibraryIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {videoCount} videos
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b' }}>
              <BarChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {participationRate} participation
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </StyledCourseCard>
    </Link>
  );
};

export default CourseDisplayCard;