
import {
  AppBar,
  Typography,
  // Button,
  // Avatar,
  useScrollTrigger,
  // IconButton,
  // Container,
  // Box,
  Theme, 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: 'none',
}));

// export const LogoText = styled(Typography)(({ theme }) => ({
export const LogoText = styled(Typography)(() => ({

  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.025em',
  cursor: 'pointer',
}));

export const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return React.cloneElement(children, {
    // elevation: trigger ? 4 : 0,
  });
};

export const headerStyles = (theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoAndNavWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  authSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  avatar: {
    bgcolor: 'primary.main',
    width: 36,
    height: 36,
    fontWeight: 'bold',
  },
  menuPaperProps: {
    elevation: 3,
    sx: {
      mt: 1.5,
      minWidth: 200,
    },
  },
  logoutMenuItemIcon: {
    mr: 1,
  },
  loginButton: {
    textTransform: 'none',
  },
  userEmailTypography: {
    wordBreak: 'break-all',
  },
});
