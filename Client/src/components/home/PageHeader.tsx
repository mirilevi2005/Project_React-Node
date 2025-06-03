import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  currentDate: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ currentDate }) => {
  return (
    <>
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
    </>
  );
};

export default PageHeader;