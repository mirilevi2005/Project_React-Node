
// // import React, { useState } from 'react';
// // import {
// //   AppBar,
// //   Toolbar,
// //   Container,
// //   Box,
// //   Typography,
// //   Button,
// //   Avatar,
// //   useScrollTrigger,
// //   Menu,
// //   MenuItem,
// //   Divider,
// //   IconButton,
// // } from '@mui/material';
// // import { styled } from '@mui/material/styles';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useNavigate, NavLink } from 'react-router-dom';
// // import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import { UserInfo } from 'firebase/auth';

// // // Styled components
// // const StyledAppBar = styled(AppBar)(({ theme }) => ({
// //   backgroundColor: theme.palette.common.white,
// //   borderBottom: `1px solid ${theme.palette.grey[200]}`,
// //   boxShadow: 'none',
// // }));

// // const LogoText = styled(Typography)(({ theme }) => ({
// //   fontWeight: 'bold',
// //   background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
// //   WebkitBackgroundClip: 'text',
// //   WebkitTextFillColor: 'transparent',
// //   letterSpacing: '-0.025em',
// //   cursor: 'pointer',
// // }));

// // const NavButton = styled(Button)(({ theme }) => ({
// //   textTransform: 'none',
// //   fontWeight: 500,
// //   fontSize: '0.95rem',
// //   color: theme.palette.text.secondary,
// //   padding: '6px 12px',
// //   borderRadius: '6px',
// //   '&:hover': {
// //     backgroundColor: theme.palette.grey[50],
// //     color: theme.palette.primary.main,
// //   },
// // }));

// // const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
// //   const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
// //   return React.cloneElement(children, {
// //     elevation: trigger ? 4 : 0,
// //   });
// // };

// // const Header = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const user = useSelector(selectCurrentUser);
// //   console.log('user:', user);

// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //   const open = Boolean(anchorEl);

// //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/');
// //   };
// //   const getHomePath=(role:string)=>{
// //   switch (role) {
// //     case 'lacturer':
// //       return '/HomeLacturer';
// //     case 'student':
// //       return '/HomeStudent';
// //     default:
// //       return '/';
// //   }
// //   }
// //   return (
// //     <>
// //       <ElevationScroll>
// //         <StyledAppBar position="fixed">
// //           <Toolbar>
// //             <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
// //                   <NavLink to={getHomePath(user?.roles || '')} style={{ textDecoration: 'none' }}>
// //                   <LogoText variant="h5">EduTech</LogoText>
// //                 </NavLink>
// //               </Box>

// //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //                 {user ? (
// //                   <>
// //                     <IconButton onClick={handleMenuOpen} size="small">
// //                       <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontWeight: 'bold' }}>
// //                         {user.userName?.charAt(0).toUpperCase() || 'U'}
// //                       </Avatar>
// //                     </IconButton>

// //                     <Menu
// //                       anchorEl={anchorEl}
// //                       open={open}
// //                       onClose={handleMenuClose}
// //                       onClick={handleMenuClose}
// //                       PaperProps={{
// //                         elevation: 3,
// //                         sx: {
// //                           mt: 1.5,
// //                           minWidth: 200,
// //                         },
// //                       }}
// //                       anchorOrigin={{
// //                         vertical: 'bottom',
// //                         horizontal: 'right',
// //                       }}
// //                       transformOrigin={{
// //                         vertical: 'top',
// //                         horizontal: 'right',
// //                       }}
// //                     >
// //                       <MenuItem disabled>
// //                         <Typography variant="subtitle2">
// //                           {user.userName || 'משתמש'}
// //                         </Typography>
// //                       </MenuItem>

// //                       <MenuItem disabled>
// //                         <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
// //                           {user.email || '***'}
// //                         </Typography>
// //                       </MenuItem>

// //                       <Divider />

// //                       <MenuItem onClick={handleLogout}>
// //                         <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
// //                         התנתקות
// //                       </MenuItem>
// //                     </Menu>
// //                   </>
// //                 ) : (
// //                   <Button
// //                     variant="outlined"
// //                     onClick={() => navigate('/')}
// //                     sx={{ textTransform: 'none' }}
// //                   >
// //                     Login
// //                   </Button>
// //                 )}
// //               </Box>
// //             </Container>
// //           </Toolbar>
// //         </StyledAppBar>
// //       </ElevationScroll>

// //       <Toolbar />
// //     </>
// //   );
// // };

// // export default Header;




// // import React, { useState } from 'react';
// // import {
// //   Toolbar,
// //   Container,
// //   Box,
// //   Typography,
// //   Button,
// //   IconButton,
// //   Menu,
// //   MenuItem,
// //   Divider,
// //   useScrollTrigger,
// // } from '@mui/material';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useNavigate, NavLink } from 'react-router-dom';
// // import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
// // import LogoutIcon from '@mui/icons-material/Logout';

// // import { StyledAppBar, LogoText, NavButton, AvatarStyled } from '../components/styles/Hader';

// // const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
// //   const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
// //   return React.cloneElement(children, {
// //     elevation: trigger ? 4 : 0,
// //   });
// // };

// // const Header = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const user = useSelector(selectCurrentUser);

// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //   const open = Boolean(anchorEl);

// //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/');
// //   };

// //   const getHomePath = (role: string) => {
// //     switch (role) {
// //       case 'lacturer':
// //         return '/HomeLacturer';
// //       case 'student':
// //         return '/HomeStudent';
// //       default:
// //         return '/';
// //     }
// //   };

// //   return (
// //     <>
// //       <ElevationScroll>
// //         <StyledAppBar position="fixed">
// //           <Toolbar>
// //             <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
// //                 <NavLink to={getHomePath(user?.roles || '')} style={{ textDecoration: 'none' }}>
// //                   <LogoText variant="h5">EduTech</LogoText>
// //                 </NavLink>
// //               </Box>

// //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //                 {user ? (
// //                   <>
// //                     <IconButton onClick={handleMenuOpen} size="small">
// //                       <AvatarStyled>
// //                         {user.userName?.charAt(0).toUpperCase() || 'U'}
// //                       </AvatarStyled>
// //                     </IconButton>

// //                     <Menu
// //                       anchorEl={anchorEl}
// //                       open={open}
// //                       onClose={handleMenuClose}
// //                       onClick={handleMenuClose}
// //                       PaperProps={{
// //                         elevation: 3,
// //                         sx: {
// //                           mt: 1.5,
// //                           minWidth: 200,
// //                         },
// //                       }}
// //                       anchorOrigin={{
// //                         vertical: 'bottom',
// //                         horizontal: 'right',
// //                       }}
// //                       transformOrigin={{
// //                         vertical: 'top',
// //                         horizontal: 'right',
// //                       }}
// //                     >
// //                       <MenuItem disabled>
// //                         <Typography variant="subtitle2">
// //                           {user.userName || 'משתמש'}
// //                         </Typography>
// //                       </MenuItem>

// //                       <MenuItem disabled>
// //                         <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
// //                           {user.email || '***'}
// //                         </Typography>
// //                       </MenuItem>

// //                       <Divider />

// //                       <MenuItem onClick={handleLogout}>
// //                         <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
// //                         התנתקות
// //                       </MenuItem>
// //                     </Menu>
// //                   </>
// //                 ) : (
// //                   <NavButton
// //                     variant="outlined"
// //                     onClick={() => navigate('/')}
// //                   >
// //                     Login
// //                   </NavButton>
// //                 )}
// //               </Box>
// //             </Container>
// //           </Toolbar>
// //         </StyledAppBar>
// //       </ElevationScroll>

// //       <Toolbar />
// //     </>
// //   );
// // };

// // export default Header;













// import React, { useState } from 'react';
// import {
//   Toolbar,
//   Container,
//   Box,
//   Typography,
//   Button,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   IconButton,
//   useTheme, // ייבוא useTheme כדי לגשת ל-theme בתוך הקומפוננטה
// } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
// import LogoutIcon from '@mui/icons-material/Logout';

// import {
//   StyledAppBar,
//   LogoText,
//   ElevationScroll,
//   headerStyles, // ייבוא אובייקט הסגנונות
// } from '../components/styles/Hader'; // וודא שהנתיב נכון

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(selectCurrentUser);
//   const theme = useTheme(); // גישה ל-theme

//   // קבלת הסגנונות המוגדרים
//   const styles = headerStyles(theme);

//   console.log('user:', user);

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   const getHomePath = (role: string) => {
//     switch (role) {
//       case 'lecturer':
//         return '/HomeLecturer';
//       case 'student':
//         return '/HomeStudent';
//       default:
//         return '/';
//     }
//   };

//   return (
//     <>
//       <ElevationScroll>
//         <StyledAppBar position="fixed">
//           <Toolbar>
//             <Container maxWidth="lg" sx={styles.container}>
//               <Box sx={styles.logoAndNavWrapper}>
//                 <NavLink to={getHomePath(user?.roles || '')} style={{ textDecoration: 'none' }}>
//                   <LogoText variant="h5">EduTech</LogoText>
//                 </NavLink>
//               </Box>

//               <Box sx={styles.authSection}>
//                 {user ? (
//                   <>
//                     <IconButton onClick={handleMenuOpen} size="small">
//                       <Avatar sx={styles.avatar}>
//                         {user.userName?.charAt(0).toUpperCase() || 'U'}
//                       </Avatar>
//                     </IconButton>

//                     <Menu
//                       anchorEl={anchorEl}
//                       open={open}
//                       onClose={handleMenuClose}
//                       onClick={handleMenuClose}
//                       PaperProps={styles.menuPaperProps}
//                       anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'right',
//                       }}
//                       transformOrigin={{
//                         vertical: 'top',
//                         horizontal: 'right',
//                       }}
//                     >
//                       <MenuItem disabled>
//                         <Typography variant="subtitle2">
//                           {user.userName || 'משתמש'}
//                         </Typography>
//                       </MenuItem>

//                       <MenuItem disabled>
//                         <Typography variant="body2" sx={styles.userEmailTypography}>
//                           {user.email || '***'}
//                         </Typography>
//                       </MenuItem>

//                       <Divider />

//                       <MenuItem onClick={handleLogout}>
//                         <LogoutIcon fontSize="small" sx={styles.logoutMenuItemIcon} />
//                         התנתקות
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 ) : (
//                   <Button
//                     variant="outlined"
//                     onClick={() => navigate('/')}
//                     sx={styles.loginButton}
//                   >
//                     Login
//                   </Button>
//                 )}
//               </Box>
//             </Container>
//           </Toolbar>
//         </StyledAppBar>
//       </ElevationScroll>

//       <Toolbar />
//     </>
//   );
// };

// export default Header;




import React, { useState } from 'react';
import {
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
import LogoutIcon from '@mui/icons-material/Logout';

import {
  StyledAppBar,
  LogoText,
  ElevationScroll,
  headerStyles,
} from '../components/styles/Hader';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const theme = useTheme();

  const styles = headerStyles(theme);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getHomePath = (role: string) => {
    switch (role) {
      case 'lecturer':
        return '/HomeLacturer';
      case 'student':
        return '/HomeStudent';
      default:
        return '/';
    }
  };

  return (
    <>
      <ElevationScroll>
        <StyledAppBar position="fixed">
          <Toolbar>
            <Container maxWidth="lg" sx={styles.container}>
              <Box sx={styles.logoAndNavWrapper}>
                <NavLink to={getHomePath(user?.roles || '')} style={{ textDecoration: 'none' }}>
                  <LogoText variant="h5">EduTech</LogoText>
                </NavLink>
              </Box>

              <Box sx={styles.authSection}>
                {user ? (
                  <>
                    <IconButton onClick={handleMenuOpen} size="small">
                      <Avatar sx={styles.avatar}>
                        {user.userName?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                      onClick={handleMenuClose}
                      PaperProps={styles.menuPaperProps}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem disabled>
                        <Typography variant="subtitle2">
                          {user.userName || 'User'}
                        </Typography>
                      </MenuItem>

                      <MenuItem disabled>
                        <Typography variant="body2" sx={styles.userEmailTypography}>
                          {user.email || '***'}
                        </Typography>
                      </MenuItem>

                      <Divider />

                      <MenuItem onClick={handleLogout}>
                        <LogoutIcon fontSize="small" sx={styles.logoutMenuItemIcon} />
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={styles.loginButton}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Container>
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>

      <Toolbar />
    </>
  );
};

export default Header;
