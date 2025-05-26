
import HomePage from '../components/HomePage';
import HomePageStudent from '../components/student/HomePageStudent';
import { Box, Container } from '@mui/material';

const HomeStudent = () => {
  return (
    <>
       <Box sx={{ 
        bgcolor: '#f8fafc', 
        minHeight: '100vh',
        pt: 4
      }}>
        <Container maxWidth="lg">   
          {/* <HomePageStudent /> */}
          <HomePage />

        </Container>
      </Box>
    </>
  );
};

export default HomeStudent;