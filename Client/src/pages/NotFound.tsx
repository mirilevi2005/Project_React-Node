// NotFound.tsx - Custom 404 page
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  textAlign: 'center',
  padding: theme.spacing(2)
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: '120px',
  fontWeight: 900,
  background: 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.05em',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '90px',
  }
}));

const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: '120px',
  color: '#3b82f6',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '90px',
  }
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 500,
  color: '#1e293b',
  marginBottom: theme.spacing(3),
  maxWidth: '600px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  }
}));

const NotFoundDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#64748b',
  marginBottom: theme.spacing(4),
  maxWidth: '500px',
}));

const HomeButton = styled(Button)(({ theme }) => ({
  borderRadius: '40px',
  background: 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
  color: 'white',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 500,
  '&:hover': {
    background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
  }
}));

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <NotFoundBox>
      <Container maxWidth="sm">
        <ErrorIcon />
        <ErrorCode variant="h1">404</ErrorCode>
        <ErrorMessage variant="h4">Oops! Page not found</ErrorMessage>
        <NotFoundDescription>
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </NotFoundDescription>
        <HomeButton 
          variant="contained" 
          onClick={handleGoHome}
          startIcon={<HomeIcon />}
        >
          Back to Dashboard
        </HomeButton>
      </Container>
    </NotFoundBox>
  );
};

export default NotFound;