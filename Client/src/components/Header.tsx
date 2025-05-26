
// import {  NavLink } from 'react-router'

// const Header = () => {
  
//     return (
//         <div>
//             <nav style={{ display: "flex", position: "fixed", top: "0px", right: "0px", left: "0px", width: "100vw",height:"10vh", backgroundColor: "white", justifyContent: "space-around",borderBottom: "2px solid black"}}>
//                 <div>
//                     <NavLink to='/HomeLacturer' style={{ color:'black'}}  > </NavLink>
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default Header




// // Header.tsx - Responsive header for tablet and up
// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Container,
//   Box,
//   Typography,
//   Button,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   useScrollTrigger,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { AppBarProps } from '@mui/material/AppBar';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PersonIcon from '@mui/icons-material/Person';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import SchoolIcon from '@mui/icons-material/School';
// import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
// import ScienceIcon from '@mui/icons-material/Science';
// import LightbulbIcon from '@mui/icons-material/Lightbulb';

// // User type definition
// interface User {
//   userName: string;
//   email: string;
//   roles: string;
//   _id: string;
//   token: string;
// }

// // Styled components
// const StyledAppBar = styled(AppBar)<{ elevation?: number }>(({ elevation = 0, theme }) => ({
//   backgroundColor: theme.palette.common.white,
//   borderBottom: elevation === 0 ? `1px solid ${theme.palette.grey[200]}` : 'none',
//   boxShadow: elevation > 0 ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none',
//   transition: 'box-shadow 0.3s ease-in-out',
// }));

// const LogoText = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   letterSpacing: '-0.025em',
// }));

// const NavButton = styled(Button)(({ theme }) => ({
//   textTransform: 'none',
//   fontWeight: 500,
//   fontSize: '0.95rem',
//   color: theme.palette.text.secondary,
//   padding: '6px 12px',
//   borderRadius: '6px',
//   '&:hover': {
//     backgroundColor: theme.palette.grey[50],
//     color: theme.palette.primary.main,
//   },
//   '&.active': {
//     color: theme.palette.primary.main,
//     fontWeight: 600,
//   },
// }));

// const UserButton = styled(Button)(({ theme }) => ({
//   textTransform: 'none',
//   borderRadius: 24,
//   backgroundColor: theme.palette.grey[50],
//   border: `1px solid ${theme.palette.grey[200]}`,
//   padding: '4px 12px 4px 6px',
//   color: theme.palette.text.primary,
//   '&:hover': {
//     backgroundColor: theme.palette.grey[100],
//     borderColor: theme.palette.grey[300],
//   },
// }));

// const MenuUserAvatar = styled(Avatar)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   width: 36,
//   height: 36,
//   fontSize: '1rem',
//   fontWeight: 'bold',
//   marginRight: 8,
// }));

// // Function to handle elevated AppBar on scroll
// interface ElevationScrollProps {
//   children: React.ReactElement<AppBarProps & { elevation?: number }>;
// }

// function ElevationScroll(props: ElevationScrollProps) {
//   const { children } = props;
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

// const activeLinkStyle = {
//   color: '#3b82f6',
//   fontWeight: 600,
// };

// const Header: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(selectCurrentUser) as User | null;

//   // User menu state
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const openUserMenu = Boolean(anchorEl);

//   const handleClickUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorEl(null);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logout());
//     handleCloseUserMenu();
//     navigate('/login');
//   };

//   // Handle profile navigation
//   const handleProfileClick = () => {
//     navigate('/profile');
//     handleCloseUserMenu();
//   };

//   // Navigation items
//   const navItems = [
//     { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
//     { text: 'Courses', path: '/courses', icon: <SchoolIcon /> },
//     { text: 'Videos', path: '/videos', icon: <VideoLibraryIcon /> },
//     { text: 'Tech Labs', path: '/tech-labs', icon: <ScienceIcon /> },
//     { text: 'Innovations', path: '/innovations', icon: <LightbulbIcon /> },
//   ];

//   return (
//     <>
//       <ElevationScroll>
//         <StyledAppBar position="fixed">
//           <Toolbar>
//             <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 {/* Mobile Menu Icon (removed as per requirement - assuming tablet+ layout) */}
//                 {/* <IconButton
//                   color="inherit"
//                   aria-label="open drawer"
//                   edge="start"
//                   onClick={handleToggleMobileDrawer}
//                   sx={{ mr: 2, display: { md: 'none' }, color: (theme) => theme.palette.text.secondary }}
//                 >
//                   <MenuIcon />
//                 </IconButton> */}

//                 <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
//                   <LogoText variant="h5">EduTech</LogoText>
//                 </NavLink>

//                 {/* Desktop/Tablet Navigation */}
//                 {/* This Box now handles all screen sizes where the header is visible */}
//                 <Box sx={{ display: 'flex', ml: 4 }}> {/* Changed from { xs: 'none', md: 'flex' } to just 'flex' */}
//                   {navItems.map((item) => (
//                     <NavLink
//                       key={item.text}
//                       to={item.path}
//                       style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
//                     >
//                       <NavButton>{item.text}</NavButton>
//                     </NavLink>
//                   ))}
//                 </Box>
//               </Box>

//               {user && (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                   <UserButton
//                     variant="contained"
//                     disableElevation
//                     onClick={handleClickUserMenu}
//                     endIcon={<KeyboardArrowDownIcon />}
//                     startIcon={
//                       <MenuUserAvatar>
//                         {user?.userName ? user.userName.charAt(0).toUpperCase() : 'U'}
//                       </MenuUserAvatar>
//                     }
//                   >
//                     {user?.userName || 'User'}
//                   </UserButton>

//                   <Menu
//                     anchorEl={anchorEl}
//                     open={openUserMenu}
//                     onClose={handleCloseUserMenu}
//                     anchorOrigin={{
//                       vertical: 'bottom',
//                       horizontal: 'right',
//                     }}
//                     transformOrigin={{
//                       vertical: 'top',
//                       horizontal: 'right',
//                     }}
//                     PaperProps={{
//                       elevation: 2,
//                       sx: {
//                         width: 200,
//                         mt: 1.5,
//                         borderRadius: 2,
//                         overflow: 'visible',
//                         '&:before': {
//                           content: '""',
//                           display: 'block',
//                           position: 'absolute',
//                           top: 0,
//                           right: 18,
//                           width: 10,
//                           height: 10,
//                           bgcolor: 'background.paper',
//                           transform: 'translateY(-50%) rotate(45deg)',
//                           zIndex: 0,
//                         },
//                       },
//                     }}
//                   >
//                     <Box sx={{ px: 2, py: 1.5 }}>
//                       <Typography variant="subtitle2" fontWeight="bold">
//                         {user?.userName}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" noWrap>
//                         {user?.email}
//                       </Typography>
//                     </Box>
//                     <Divider />
//                     <MenuItem onClick={handleProfileClick} sx={{ py: 1.5 }}>
//                       <PersonIcon fontSize="small" sx={{ mr: 1.5, color: (theme) => theme.palette.text.secondary }} />
//                       <Typography variant="body2">My Profile</Typography>
//                     </MenuItem>
//                     <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: (theme) => theme.palette.error.main }}>
//                       <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
//                       <Typography variant="body2">Logout</Typography>
//                     </MenuItem>
//                   </Menu>
//                 </Box>
//               )}
//             </Container>
//           </Toolbar>
//         </StyledAppBar>
//       </ElevationScroll>

//       {/* Toolbar placeholder to push content below app bar */}
//       <Toolbar />
//     </>
//   );
// };

// export default Header;







// // Header.tsx
// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Container,
//   Box,
//   Typography,
//   Button,
//   Avatar,
//   useScrollTrigger,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
// import LogoutIcon from '@mui/icons-material/Logout';

// // Styled components
// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   backgroundColor: theme.palette.common.white,
//   borderBottom: `1px solid ${theme.palette.grey[200]}`,
//   boxShadow: 'none',
// }));

// const LogoText = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   letterSpacing: '-0.025em',
//   cursor: 'pointer',
// }));

// const NavButton = styled(Button)(({ theme }) => ({
//   textTransform: 'none',
//   fontWeight: 500,
//   fontSize: '0.95rem',
//   color: theme.palette.text.secondary,
//   padding: '6px 12px',
//   borderRadius: '6px',
//   '&:hover': {
//     backgroundColor: theme.palette.grey[50],
//     color: theme.palette.primary.main,
//   },
// }));

// const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
//   const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// };

// const Header: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(selectCurrentUser);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <>
//       <ElevationScroll>
//         <StyledAppBar position="fixed">
//           <Toolbar>
//             <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//                 <NavLink to="/" style={{ textDecoration: 'none' }}>
//                   <LogoText variant="h5">EduTech</LogoText>
//                 </NavLink>
//               </Box>

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 {user ? (
//                   <>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontWeight: 'bold' }}>
//                       {user.userName?.charAt(0).toUpperCase() || 'U'}
//                     </Avatar>
//                     <Button
//                       onClick={handleLogout}
//                       startIcon={<LogoutIcon />}
//                       sx={{ color: 'error.main', textTransform: 'none' }}
//                     >
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <Button
//                     variant="outlined"
//                     onClick={() => navigate('/')}
//                     sx={{ textTransform: 'none' }}
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
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  useScrollTrigger,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { selectCurrentUser, logout } from '../redux/slice/authStateSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserInfo } from 'firebase/auth';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: 'none',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.025em',
  cursor: 'pointer',
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  color: theme.palette.text.secondary,
  padding: '6px 12px',
  borderRadius: '6px',
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.primary.main,
  },
}));

const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

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
  // const getHomePath=(role:string)=>{
  // switch (role) {
  //   case 'lacturer':
  //     return '/HomeLacturer';
  //   case 'student':
  //     return '/HomeStudent';
  //   default:
  //     return '/';
  // }
  // }
  //  const user123=useSelector(selectCurrentUser);
  return (
    <>
      <ElevationScroll>
        <StyledAppBar position="fixed">
          <Toolbar>
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                {/* <NavLink to={getHomePath(user123?.roles)} style={{ textDecoration: 'none' }}> */}
                  <LogoText variant="h5">EduTech</LogoText>
                </NavLink>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {user ? (
                  <>
                    <IconButton onClick={handleMenuOpen} size="small">
                      <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontWeight: 'bold' }}>
                        {user.userName?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                      onClick={handleMenuClose}
                      PaperProps={{
                        elevation: 3,
                        sx: {
                          mt: 1.5,
                          minWidth: 200,
                        },
                      }}
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
                          {user.userName || 'משתמש'}
                        </Typography>
                      </MenuItem>

                      <MenuItem disabled>
                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                          {user.email || '***'}
                        </Typography>
                      </MenuItem>

                      <Divider />

                      <MenuItem onClick={handleLogout}>
                        <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                        התנתקות
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{ textTransform: 'none' }}
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
