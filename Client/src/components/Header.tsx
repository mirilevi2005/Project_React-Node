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
        return '/HomeLecturer';
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
