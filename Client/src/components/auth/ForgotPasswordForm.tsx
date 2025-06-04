import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { tempFormStyle } from '../styles/signInStyles';

interface Props {
  onSendTempPassword: (email: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

const ForgotPasswordForm = ({ onSendTempPassword, onBack, isLoading }: Props) => {

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
      <Typography>Enter your email address to receive a temporary password:</Typography>
      <TextField name="email" label="Email" fullWidth required type="email" />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Temporary Password'}
      </Button>
      <Button onClick={onBack}>Back</Button>
    </Box>
  );
};

export default ForgotPasswordForm;
