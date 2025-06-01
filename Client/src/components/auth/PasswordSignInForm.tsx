import React from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { SignInForm } from '../../schema/SignIn'; // עדכן נתיב אם צריך
import { formStyle, centerTextStyle } from '../../css/signInStyles'; // עדכן נתיב אם צריך

interface PasswordSignInFormProps {
  onPasswordLogin: SubmitHandler<SignInForm>;
  onGoogleLogin: () => void;
  onForgotPassword: () => void;
  onNavigateToSignUp: () => void;
  isLoading: boolean;
  signInLoading: boolean;
}

const PasswordSignInForm: React.FC<PasswordSignInFormProps> = ({
  onPasswordLogin,
  onGoogleLogin,
  onForgotPassword,
  onNavigateToSignUp,
  isLoading,
  signInLoading,
}) => {
  const { register, handleSubmit, formState: { errors } } = useFormContext<SignInForm>();

  return (
    <Box component="form" onSubmit={handleSubmit(onPasswordLogin)} sx={formStyle}>
      <TextField
        label="אימייל"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="סיסמה"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading || signInLoading}
      >
        {isLoading || signInLoading ? "מתחבר..." : "התחבר"}
      </Button>
      <Button
        sx={{ textTransform: 'none' }}
        onClick={onForgotPassword}
      >
        שכחת סיסמה?
      </Button>
      <Typography sx={centerTextStyle}>
        אין לך חשבון?{" "}
        <Button variant="text" onClick={onNavigateToSignUp}>
          הירשם כאן
        </Button>
      </Typography>
      <Divider>או</Divider>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={onGoogleLogin}
      >
        התחברות עם Google
      </Button>
    </Box>
  );
};

export default PasswordSignInForm;