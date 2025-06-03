import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { tempFormStyle } from '../styles/signInStyles'; 

interface Props {
  onSendTempPassword: (email: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

const ForgotPasswordForm = ({onSendTempPassword,onBack,isLoading}: Props) => {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    if (email) {
      onSendTempPassword(email);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={tempFormStyle}>
      <Typography>הכנס את כתובת המייל שלך לקבלת סיסמה זמנית:</Typography>
      <TextField name="email" label="אימייל" fullWidth required type="email" />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'שולח...' : 'שלח סיסמה זמנית'}
      </Button>
      <Button onClick={onBack}>חזרה</Button>
    </Box>
  );
};

export default ForgotPasswordForm;