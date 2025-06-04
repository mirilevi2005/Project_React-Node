

import { SxProps, Theme } from "@mui/material";

export const containerSx: SxProps<Theme> = {
  width:'90vw'
};

export const cardSx = (active: boolean, theme: Theme): SxProps<Theme> => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  border: active ? `2px solid ${theme.palette.primary.main}` : 'none',
});

export const cardContentSx: SxProps<Theme> = {
  flexGrow: 1,
  textAlign: 'center',
};

export const iconSx = (theme: Theme): SxProps<Theme> => ({
  fontSize: 60,
  color: theme.palette.primary.main,
  mb: 2,
});

export const bottomBoxSx: SxProps<Theme> = {
  mt: 4,
};

