// // import { useSelector } from 'react-redux';
// // import HomePagelacturer from '../components/HomePagelacturer';
// // import { selectCurrentUser } from '../redux/slice/authStateSlice';

// // const HomeLacturer = () => {
// //   const user = useSelector(selectCurrentUser);

// //   return (
// //     <>
// //       <h1>Lacturer {user?.userName}</h1>
// //       <HomePagelacturer />
// //     </>
// //   );
// // };

// // export default HomeLacturer;



// // // HomeLecturer.jsx
// // import { useSelector } from 'react-redux';
// // import { Container, Box, Typography, AppBar, Toolbar, Avatar } from '@mui/material';
// // import HomePagelacturer from '../components/HomePagelacturer';
// // import { selectCurrentUser } from '../redux/slice/authStateSlice';

// // const HomeLacturer = () => {
// //   const user = useSelector(selectCurrentUser);

// //   return (
// //     <>
// //       <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
// //         <Toolbar>
// //           <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //             <Typography variant="h6" component="div" sx={{ color: '#0f172a', fontWeight: 'bold' }}>
// //               אפליקציית לימודים
// //             </Typography>
            
// //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //               <Typography variant="body1" sx={{ color: '#64748b' }}>
// //                 שלום, {user?.userName}
// //               </Typography>
              
// //               <Avatar 
// //                 sx={{ 
// //                   bgcolor: '#3b82f6', 
// //                   width: 36, 
// //                   height: 36,
// //                   fontSize: '1rem',
// //                   fontWeight: 'bold'
// //                 }}
// //               >
// //                 {/* הצגת האות הראשונה של שם המשתמש */}
// //                 {user?.userName ? user.userName.charAt(0).toUpperCase() : 'M'}
// //               </Avatar>
// //             </Box>
// //           </Container>
// //         </Toolbar>
// //       </AppBar>
      
// //       <Box sx={{ 
// //         bgcolor: '#f8fafc', 
// //         minHeight: '100vh',
// //         pt: 4
// //       }}>
// //         <Container maxWidth="lg">
// //           <Box sx={{ 
// //             display: 'flex', 
// //             alignItems: 'center', 
// //             justifyContent: 'space-between',
// //             mb: 4
// //           }}>
// //             <Typography 
// //               variant="h4" 
// //               component="h1" 
// //               sx={{ 
// //                 color: '#0f172a',
// //                 fontWeight: 'bold',
// //                 fontSize: { xs: '1.75rem', md: '2.25rem' } 
// //               }}
// //             >
// //               ברוך הבא, מרצה {user?.userName}
// //             </Typography>
// //           </Box>
          
// //           <HomePagelacturer />
// //         </Container>
// //       </Box>
// //     </>
// //   );
// // };

// // export default HomeLacturer;

// // HomeLecturer.tsx
// import { useSelector } from 'react-redux';
// import { Container, Box, Typography, AppBar, Toolbar, Avatar } from '@mui/material';
// import HomePagelacturer from '../components/HomePagelacturer';
// import { selectCurrentUser } from '../redux/slice/authStateSlice';
// import '../css/HomeLacturer.css';

// // הגדרת הטיפוס למשתמש
// interface User {
//   userName: string;
//   // הוסיפי שדות נוספים בהתאם למבנה המשתמש בפרויקט שלך
// }

// const HomeLacturer = () => {
//   // הגדרת הטיפוס של המשתמש הנוכחי
//   const user = useSelector(selectCurrentUser) as User | null;

//   return (
//     <>
//       <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
//         <Toolbar>
//           <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" component="div" sx={{ color: '#0f172a', fontWeight: 'bold' }}>
//               אפליקציית לימודים
//             </Typography>
            
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Typography variant="body1" sx={{ color: '#64748b' }}>
//                 שלום, {user?.userName || ''}
//               </Typography>
              
//               <Avatar 
//                 sx={{ 
//                   bgcolor: '#3b82f6', 
//                   width: 36, 
//                   height: 36,
//                   fontSize: '1rem',
//                   fontWeight: 'bold'
//                 }}
//               >
//                 {/* הצגת האות הראשונה של שם המשתמש */}
//                 {user?.userName ? user.userName.charAt(0).toUpperCase() : ''}
//               </Avatar>
//             </Box>
//           </Container>
//         </Toolbar>
//       </AppBar>
      
//       <Box sx={{ 
//         bgcolor: '#f8fafc', 
//         minHeight: '100vh',
//         pt: 4
//       }}>
//         <Container maxWidth="lg">
//           <Box 
//             sx={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'space-between',
//               mb: 4
//             }}
//             className="page-header"
//           >
//             <Typography 
//               variant="h4" 
//               component="h1" 
//               sx={{ 
//                 color: '#0f172a',
//                 fontWeight: 'bold',
//                 fontSize: { xs: '1.75rem', md: '2.25rem' } 
//               }}
//               className="lecturer-greeting"
//             >
//               ברוך הבא, מרצה {user?.userName || ''}
//             </Typography>
//           </Box>
          
//           <HomePagelacturer />
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default HomeLacturer;









// // HomeLecturer.tsx
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Container, 
//   Box, 
//   Typography, 
//   AppBar, 
//   Toolbar, 
//   Avatar, 
//   Button, 
//   Menu, 
//   MenuItem,
//   Divider,
//   IconButton
// } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PersonIcon from '@mui/icons-material/Person';
// import HomePagelacturer from '../components/HomePagelacturer';
// import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
// import { styled } from '@mui/material/styles';
// import { useState } from 'react';

// // הגדרת הטיפוס למשתמש
// interface User {
//   userName: string;
//   email: string;
//   roles: string;
//   _id: string;
//   token: string;
// }

// // סגנונות מתקדמים באמצעות styled-components
// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   backgroundColor: '#ffffff',
//   borderBottom: '1px solid #e2e8f0',
//   boxShadow: 'none'
// }));

// const UserButton = styled(Button)(({ theme }) => ({
//   textTransform: 'none',
//   borderRadius: 24,
//   backgroundColor: '#f8fafc',
//   border: '1px solid #e2e8f0',
//   padding: '4px 12px 4px 6px',
//   color: '#0f172a',
//   '&:hover': {
//     backgroundColor: '#f1f5f9',
//     borderColor: '#cbd5e1'
//   }
// }));

// const MenuUserAvatar = styled(Avatar)(({ theme }) => ({
//   backgroundColor: '#3b82f6',
//   width: 36,
//   height: 36,
//   fontSize: '1rem',
//   fontWeight: 'bold',
//   marginRight: theme.spacing(1)
// }));

// const HomeLacturer = ()=> {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(selectCurrentUser) as User | null;
  
//   // מצב לתפריט המשתמש
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
  
//   const handleClickUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
  
//   const handleCloseUserMenu = () => {
//     setAnchorEl(null);
//   };
  
//   // טיפול בהתנתקות
//   const handleLogout = () => {
//     dispatch(logout());
//     handleCloseUserMenu();
//     navigate('/login');
//   };

//   return (
//     <>
//       <StyledAppBar position="static">
//         <Toolbar>
//           <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography 
//               variant="h6" 
//               component="div" 
//               sx={{ 
//                 color: '#0f172a', 
//                 fontWeight: 'bold',
//                 display: 'flex',
//                 alignItems: 'center'
//               }}
//             >
//               <Box 
//                 component="span" 
//                 sx={{ 
//                   display: 'inline-block',
//                   width: 10,
//                   height: 10,
//                   bgcolor: '#3b82f6',
//                   borderRadius: '50%',
//                   mr: 1
//                 }} 
//               />
//               אפליקציית לימודים
//             </Typography>
            
//             {user && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <UserButton
//                   variant="contained"
//                   disableElevation
//                   onClick={handleClickUserMenu}
//                   endIcon={<KeyboardArrowDownIcon />}
//                   startIcon={
//                     <MenuUserAvatar>
//                       {user?.userName ? user.userName.charAt(0).toUpperCase() : 'M'}
//                     </MenuUserAvatar>
//                   }
//                 >
//                   {user?.userName || 'משתמש'}
//                 </UserButton>
                
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={open}
//                   onClose={handleCloseUserMenu}
//                   anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                   }}
//                   transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                   PaperProps={{
//                     elevation: 2,
//                     sx: { 
//                       width: 200,
//                       mt: 1.5,
//                       borderRadius: 2,
//                       overflow: 'visible',
//                       '&:before': {
//                         content: '""',
//                         display: 'block',
//                         position: 'absolute',
//                         top: 0,
//                         right: 18,
//                         width: 10,
//                         height: 10,
//                         bgcolor: 'background.paper',
//                         transform: 'translateY(-50%) rotate(45deg)',
//                         zIndex: 0,
//                       },
//                     }
//                   }}
//                 >
//                   <Box sx={{ px: 2, py: 1.5 }}>
//                     <Typography variant="subtitle2" fontWeight="bold">
//                       {user?.userName}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" noWrap>
//                       {user?.email}
//                     </Typography>
//                   </Box>
//                   <Divider />
//                   <MenuItem onClick={handleCloseUserMenu} sx={{ py: 1.5 }}>
//                     <PersonIcon fontSize="small" sx={{ mr: 1.5, color: '#64748b' }} />
//                     <Typography variant="body2">הפרופיל שלי</Typography>
//                   </MenuItem>
//                   <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#ef4444' }}>
//                     <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
//                     <Typography variant="body2">התנתקות</Typography>
//                   </MenuItem>
//                 </Menu>
//               </Box>
//             )}
//           </Container>
//         </Toolbar>
//       </StyledAppBar>
      
//       <Box sx={{ 
//         bgcolor: '#f8fafc', 
//         minHeight: '100vh',
//         pt: 4
//       }}>
//         <Container maxWidth="lg">
//           <Box sx={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'space-between',
//             mb: 4
//           }}>
//             <Typography 
//               variant="h4" 
//               component="h1" 
//               sx={{ 
//                 color: '#0f172a',
//                 fontWeight: 'bold',
//                 fontSize: { xs: '1.75rem', md: '2.25rem' } 
//               }}
//             >
//               ברוך הבא, מרצה {user?.userName || ''}
//             </Typography>
//           </Box>
          
//           <HomePagelacturer />
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default HomeLacturer;








// HomeLecturer.tsx
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  AppBar, 
  Toolbar, 
  Avatar, 
  Button, 
  Menu, 
  MenuItem,
  Divider,
  IconButton
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HomePageLecturer from '../components/HomePagelacturer';
import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

// User type definition
interface User {
  userName: string;
  email: string;
  roles: string;
  _id: string;
  token: string;
}

// Advanced styles using styled-components
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e2e8f0',
  boxShadow: 'none'
});

const UserButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 24,
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '4px 12px 4px 6px',
  color: '#0f172a',
  '&:hover': {
    backgroundColor: '#f1f5f9',
    borderColor: '#cbd5e1'
  }
});

const MenuUserAvatar = styled(Avatar)({
  backgroundColor: '#3b82f6',
  width: 36,
  height: 36,
  fontSize: '1rem',
  fontWeight: 'bold',
  marginRight: 8
});

const HomeLecturer = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector(selectCurrentUser) as User | null;
  
  // User menu state
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  
  // const handleClickUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  
  // const handleCloseUserMenu = () => {
  //   setAnchorEl(null);
  // };
  
  // Handle logout
  // const handleLogout = () => {
  //   dispatch(logout());
  //   handleCloseUserMenu();
  //   navigate('/login');
  // };

  return (
    <>
      {/* <StyledAppBar position="static">
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>         
            {/* {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <UserButton
                  variant="contained"
                  disableElevation
                  onClick={handleClickUserMenu}
                  endIcon={<KeyboardArrowDownIcon />}
                  startIcon={
                    <MenuUserAvatar>
                      {user?.userName ? user.userName.charAt(0).toUpperCase() : 'M'}
                    </MenuUserAvatar>
                  }
                >
                  {user?.userName || 'User'}
                </UserButton>
                
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    elevation: 2,
                    sx: { 
                      width: 200,
                      mt: 1.5,
                      borderRadius: 2,
                      overflow: 'visible',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 18,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    }
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {user?.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {user?.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem onClick={handleCloseUserMenu} sx={{ py: 1.5 }}>
                    <PersonIcon fontSize="small" sx={{ mr: 1.5, color: '#64748b' }} />
                    <Typography variant="body2">My Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#ef4444' }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
                    <Typography variant="body2">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )} */}
          {/* </Container>
        </Toolbar>
      </StyledAppBar> */} 
      
      <Box sx={{ 
        bgcolor: '#f8fafc', 
        minHeight: '100vh',
        pt: 4
      }}>
        <Container maxWidth="lg">
          {/* <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 4
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#0f172a',
                fontWeight: 'bold',
                fontSize: { xs: '1.75rem', md: '2.25rem' } 
              }}
            >
              Welcome, {user?.userName || ''}
            </Typography>
          </Box> */}
          
          <HomePageLecturer />
        </Container>
      </Box>
    </>
  );
};

export default HomeLecturer;