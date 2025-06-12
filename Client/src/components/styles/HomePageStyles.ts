import { styled } from '@mui/material/styles';
import { Card, Typography, Paper, Box, SxProps, Theme } from '@mui/material';

export const StyledCourseCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: 24,
  overflow: 'hidden',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer'
  }
});

export const SectionTitle = styled(Typography)({
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

export const QuickStatCard = styled(Paper)({
  padding: 24,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 20,
  height: '100%',
  transition: 'all 0.3s',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
  backgroundColor: '#ffffff',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
  }
});

export const StatIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: '50%',
  marginRight: 16,
});

// טיפוסים לעיצוב סטנדרטי
type SxStyle = SxProps<Theme>;

export const containerStyle: SxStyle = {
  py: 4,
  backgroundColor: '#fafafa',
  minHeight: '100vh'
};

export const dateStyle: SxStyle = {
  textAlign: 'right',
  mb: 3,
  color: '#64748b',
  fontWeight: 500
};

export const headerBoxStyle: SxStyle = {
  mb: 6,
  textAlign: 'center'
};

export const titleStyle: SxStyle = {
  fontWeight: 'bold',
  color: '#1e293b',
  mb: 2
};

export const quoteStyle: SxStyle = {
  fontStyle: 'italic',
  color: '#475569',
  maxWidth: '600px',
  mx: 'auto',
  fontWeight: 400
};

export const gridStatsStyle: SxStyle = {
  mb: 15
};

export const cardGridStyle: SxStyle = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  gap: 4,
  mb: 6
};

export const cardImageStyle: SxStyle = {
  objectFit: 'cover'
};

export const cardContentStyle: SxStyle = {
  flexGrow: 1,
  p: 3
};

export const cardHeaderStyle: SxStyle = {
  display: 'flex',
  alignItems: 'center',
  mb: 2,
  justifyContent: 'space-between'
};

export const statTitleStyle: SxStyle = {
  color: '#64748b',
  fontWeight: 500,
  mb: 0.5
};

export const statValueStyle: SxStyle = {
  fontWeight: 'bold',
  color: '#1e293b'
};
