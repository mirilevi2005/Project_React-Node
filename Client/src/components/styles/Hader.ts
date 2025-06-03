// import { styled } from '@mui/material/styles';
// import { AppBar, Typography, Button, Avatar } from '@mui/material';

// export const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   backgroundColor: theme.palette.common.white,
//   borderBottom: `1px solid ${theme.palette.grey[200]}`,
//   boxShadow: 'none',
// }));

// export const LogoText = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   letterSpacing: '-0.025em',
//   cursor: 'pointer',
// }));

// export const NavButton = styled(Button)(({ theme }) => ({
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

// export const AvatarStyled = styled(Avatar)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   width: 36,
//   height: 36,
//   fontWeight: 'bold',
// }));



import {
  AppBar,
  Typography,
  Button,
  Avatar,
  useScrollTrigger,
  IconButton,
  Container,
  Box,
  Theme, // ייבוא Theme לצורך טיפוס
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// Styled components
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: 'none',
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.025em',
  cursor: 'pointer',
}));

// הפונקציה ElevationScroll נשארת כאן כי היא קשורה ישירות ללוגיקת עיצוב המבוססת על סקרין
export const ElevationScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

// הגדרת סגנונות כ-constants שניתן לייבא
// חשוב להשתמש בפונקציה שמקבלת theme אם יש תלויות ב-theme
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
