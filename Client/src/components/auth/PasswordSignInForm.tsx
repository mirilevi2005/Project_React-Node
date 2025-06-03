// import React from 'react';
// import { Box, Button, Divider, TextField, Typography } from '@mui/material';
// import { zodResolver } from '@hookform/resolvers/zod';
// import GoogleIcon from '@mui/icons-material/Google';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { SignInForm, SignInSchema } from '../../schema/SignIn'; 
// import { formStyle, centerTextStyle } from '../styles/signInStyles'; 

// interface Props {
//   onPasswordLogin: SubmitHandler<SignInForm>;
//   onGoogleLogin: () => void;
//   onForgotPassword: () => void;
//   onNavigateToSignUp: () => void;
//   isLoading: boolean;
//   signInLoading: boolean;
// }

// const PasswordSignInForm=({  onPasswordLogin,onGoogleLogin,onForgotPassword,onNavigateToSignUp,isLoading,signInLoading}:Props)=>{
//   const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
//     resolver: zodResolver(SignInSchema),
//   });
//   return (
//     <Box component="form" onSubmit={handleSubmit(onPasswordLogin)} sx={formStyle}>
//       <TextField
//         label="אימייל"
//         fullWidth
//         error={!!errors.email}
//         helperText={errors.email?.message}
//         {...register("email")}
//       />
//       <TextField
//         label="סיסמה"
//         type="password"
//         fullWidth
//         error={!!errors.password}
//         helperText={errors.password?.message}
//         {...register("password")}
//       />
//       <Button
//         type="submit"
//         variant="contained"
//         fullWidth
//         disabled={isLoading || signInLoading}
//       >
//         {isLoading || signInLoading ? "מתחבר..." : "התחבר"}
//       </Button>
//       <Button
//         sx={{ textTransform: 'none' }}
//         onClick={onForgotPassword}
//       >
//         שכחת סיסמה?
//       </Button>
//       <Typography sx={centerTextStyle}>
//         אין לך חשבון?{" "}
//         <Button variant="text" onClick={onNavigateToSignUp}>
//           הירשם כאן
//         </Button>
//       </Typography>
//       <Divider>או</Divider>
//       <Button
//         variant="outlined"
//         fullWidth
//         startIcon={<GoogleIcon />}
//         onClick={onGoogleLogin}
//       >
//         התחברות עם Google
//       </Button>
//     </Box>
//   );
// };

// export default PasswordSignInForm;





import React from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignInForm, SignInSchema } from '../../schema/SignIn'; 
import { formStyle, centerTextStyle } from '../styles/signInStyles'; 

interface Props {
  onPasswordLogin: SubmitHandler<SignInForm>;
  onGoogleLogin: () => void;
  onForgotPassword: () => void;
  onNavigateToSignUp: () => void;
  isLoading: boolean;
  signInLoading: boolean;
}

const PasswordSignInForm = ({
  onPasswordLogin,
  onGoogleLogin,
  onForgotPassword,
  onNavigateToSignUp,
  isLoading,
  signInLoading
}: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onPasswordLogin)} sx={formStyle}>
      <TextField
        label="Email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="Password"
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
        {isLoading || signInLoading ? "Signing in..." : "Sign In"}
      </Button>
      <Button
        sx={{ textTransform: 'none' }}
        onClick={onForgotPassword}
      >
        Forgot password?
      </Button>
      <Typography sx={centerTextStyle}>
        Don't have an account?{" "}
        <Button variant="text" onClick={onNavigateToSignUp}>
          Sign up here
        </Button>
      </Typography>
      <Divider>or</Divider>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={onGoogleLogin}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default PasswordSignInForm;
