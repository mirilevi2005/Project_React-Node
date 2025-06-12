
import { SxProps, Theme } from '@mui/material/styles';

export const loginContainerStyle: SxProps<Theme> = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
};

export const loginBoxStyle: SxProps<Theme> = {
  padding: '30px',
  width: '400px',
  borderRadius: '15px',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
};

export const loginTitleStyle: SxProps<Theme> = {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 600,
};

export const loginFormStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

export const bottomTextStyle: SxProps<Theme> = {
  marginTop: (theme) => theme.spacing(2),
};

export const signInLinkStyle: SxProps<Theme> = {
  color: 'primary.main',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
};
