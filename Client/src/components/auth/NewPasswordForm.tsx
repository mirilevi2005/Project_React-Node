import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NewPasswordForm as NewPasswordFormType } from '../../schema/SignIn'; 
import { tempFormStyle } from '../../css/signInStyles'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordSchema } from '../../schema/SignIn';
interface Props {
  onSubmit: SubmitHandler<NewPasswordFormType>;
  isLoading: boolean; 
}
 const NewPasswordForm = ({onSubmit,isLoading}: Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormType>({
  resolver: zodResolver(NewPasswordSchema),
});

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