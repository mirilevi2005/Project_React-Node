import React from 'react';
import { Grid } from '@mui/material';
import QuickStatDisplayCard from './QuickStatDisplayCard';
import { QuickStat } from '../../interface/HomePage';

interface QuickStatsSectionProps {
  quickStats: QuickStat[];
}

const QuickStatsSection: React.FC<QuickStatsSectionProps> = ({ quickStats }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 15 }}>
      {quickStats.map((stat, index) => (
        <QuickStatDisplayCard key={index} stat={stat} />
      ))}
    </Grid>
  );
};

export default QuickStatsSection;