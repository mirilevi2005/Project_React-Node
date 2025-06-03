import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { QuickStatPaper, StatIconBox } from '../../css/HomePage';
import { QuickStat } from '../../interface/HomePage';

interface Props {
  stat: QuickStat;
}

const QuickStatDisplayCard = ({ stat }:Props) => {
  return (
    <Grid item xs={12} sm={6} md={3}> {/* המפתח (key) יסופק על ידי פונקציית המיפוי בקומפוננטת האב */}
      <QuickStatPaper elevation={0}>
        <StatIconBox sx={{ backgroundColor: stat.bgColor }}>
          {stat.icon}
        </StatIconBox>
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
      </QuickStatPaper>
    </Grid>
  );
};

export default QuickStatDisplayCard;