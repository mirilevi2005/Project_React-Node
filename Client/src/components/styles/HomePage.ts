import { styled } from '@mui/material/styles';
import { Card, Paper, Typography, Box } from '@mui/material';

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


export const QuickStatPaper = styled(Paper)({ 
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

export const StatIconBox = styled(Box)({ 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: '50%',
  marginRight: 16,
});

export const backgroundImages: Record<string, string> = {
  "Ai": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "CyberSecurity": "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "CloudComputing": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};