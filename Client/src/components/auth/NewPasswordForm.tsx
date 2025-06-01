import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { NewPasswordForm as NewPasswordFormType } from '../../schema/SignIn'; // עדכן נתיב אם צריך
import { tempFormStyle } from '../../css/signInStyles'; // עדכן נתיב אם צריך

interface NewPasswordFormProps {
  onSubmit: SubmitHandler<NewPasswordFormType>;
  isLoading: boolean; // changeLoading
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { register, handleSubmit, formState: { errors } } = useFormContext<NewPasswordFormType>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={tempFormStyle}>
      <Typography>הזן סיסמה חדשה:</Typography>
      <TextField
        label="סיסמה חדשה"
        type="password"
        fullWidth
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <TextField
        label="אישור סיסמה חדשה"
        type="password"
        fullWidth
        error={!!errors.confirmNewPassword}
        helperText={errors.confirmNewPassword?.message}
        {...register("confirmNewPassword")}
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'מעדכן...' : 'עדכן סיסמה'}
      </Button>
    </Box>
  );
};

export default NewPasswordForm;