import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { TempPasswordForm } from '../../schema/SignIn'; // עדכן נתיב אם צריך
import { tempFormStyle } from '../../css/signInStyles'; // עדכן נתיב אם צריך

interface TemporaryPasswordFormProps {
  onSubmit: SubmitHandler<TempPasswordForm>;
  isLoading: boolean; // verifyLoading
}

const TemporaryPasswordForm: React.FC<TemporaryPasswordFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { register, handleSubmit, formState: { errors } } = useFormContext<TempPasswordForm>();

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