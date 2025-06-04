import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TempPasswordForm } from '../../schema/SignIn'; 
import { tempFormStyle } from '../styles/signInStyles'; 

interface Props {
  onSubmit: SubmitHandler<TempPasswordForm>;
  isLoading: boolean;
}
const TemporaryPasswordForm=({ onSubmit,isLoading}:Props)=>{
  const { register, handleSubmit, formState: { errors } } = useForm<TempPasswordForm>();
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={tempFormStyle}>
      <Typography>הזן את הסיסמה הזמנית שקיבלת בדוא"ל:</Typography>
      <TextField
        label="סיסמה זמנית"
        fullWidth
        error={!!errors.tempPassword}
        helperText={errors.tempPassword?.message}
        {...register("tempPassword")}
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'מאמת...' : 'אימות סיסמה זמנית'}
      </Button>
    </Box>
  );
};

export default TemporaryPasswordForm;