import { SxProps, Theme } from '@mui/material/styles';

export const bottomTextStyle: SxProps<Theme> = {
  marginTop: (theme) => theme.spacing(2), // שימוש ב-theme spacing של MUI
};

export const signInLinkStyle: SxProps<Theme> = {
  color: 'primary.main', // שימוש בצבע הראשי מה-theme, או 'blue' אם זה הצבע הספציפי הרצוי
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
};