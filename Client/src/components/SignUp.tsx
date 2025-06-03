// // import { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
// // import { Visibility, VisibilityOff } from '@mui/icons-material';
// // import { useNavigate } from 'react-router';
// // import { useDispatch } from 'react-redux';
// // import { setUser } from '../redux/slice/authStateSlice';
// // import { useSignUpMutation } from '../redux/slice/api/authApi';
// // import { LoginType } from '../schema/SignUpSchama';
// // import SignUpSchama from '../schema/SignUpSchama';
// // import '../css/SignUp.css';

// // const SignUp = () => {
// //   const {
// //     register,
// //     handleSubmit,
// //     reset,
// //     formState: { errors },
// //   } = useForm<LoginType>({
// //     resolver: zodResolver(SignUpSchama),
// //     defaultValues: {
// //       userName: '',
// //       email: '',
// //       password: '',
// //       adminCode: '',
// //     },
// //   });

// //   const [showPassword, setShowPassword] = useState(false);
// //   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const [signUp] = useSignUpMutation();

// //   const onSubmit = async (data: LoginType) => {
// //     try {
// //       const result = await signUp(data).unwrap(); // result is of type AuthResponse
// //       dispatch(setUser(result.newUser));
// //       console.log(result.newUser);
      
// //       reset();

// //       const role = result.newUser.roles;

// //       if (role === 'student') navigate('/HomeStudent');
// //       else if (role === 'lacturer') navigate('/HomeLacturer');
// //     } catch (err: any) {
// //       console.error('Sign up error:', err);
// //       alert(err?.data?.message || 'Registration failed');
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-box">
// //         <Typography className="login-title">Sign Up</Typography>

// //         <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
// //           <TextField
// //             label="Username"
// //             variant="outlined"
// //             {...register('userName')}
// //             error={!!errors.userName}
// //             helperText={errors.userName?.message}
// //             fullWidth
// //           />

// //           <TextField
// //             label="Email"
// //             variant="outlined"
// //             {...register('email')}
// //             error={!!errors.email}
// //             helperText={errors.email?.message}
// //             fullWidth
// //           />

// //           <TextField
// //             label="Password"
// //             type={showPassword ? 'text' : 'password'}
// //             variant="outlined"
// //             {...register('password')}
// //             error={!!errors.password}
// //             helperText={errors.password?.message}
// //             fullWidth
// //             InputProps={{
// //               endAdornment: (
// //                 <InputAdornment position="end">
// //                   <IconButton onClick={togglePasswordVisibility} edge="end">
// //                     {showPassword ? <VisibilityOff /> : <Visibility />}
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />

// //           <TextField
// //             label="Admin Code"
// //             variant="outlined"
// //             {...register('adminCode')}
// //             error={!!errors.adminCode}
// //             helperText={errors.adminCode?.message}
// //             fullWidth
// //           />

// //           <Button variant="contained" color="primary" type="submit" fullWidth>
// //             Sign Up
// //           </Button>

// //           <Typography variant="body2" sx={{ marginTop: 2 }}>
// //             Already have an account?{' '}
// //             <span onClick={() => navigate('/')} style={{ color: 'blue', cursor: 'pointer' }}>
// //               Sign In
// //             </span>
// //           </Typography>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUp;
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button, IconButton, InputAdornment, TextField, Typography, Box } from '@mui/material'; // נוסף Box
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useNavigate } from 'react-router';
// import { useDispatch } from 'react-redux';
// import { Cookies, useCookies } from "react-cookie";
// import { setUser,setPreviousLogin } from '../redux/slice/authStateSlice';
// import { useSignUpMutation } from '../redux/slice/api/authApi';
// import { LoginType } from '../schema/SignUpSchama';
// import SignUpSchama from '../schema/SignUpSchama';
// import * as styles from '../css/SignUp'; // ייבוא של קובץ הסטיילים החדש

// const SignUp = () => {

//   const {register,handleSubmit,reset,formState: { errors },} = useForm<LoginType>({
//     resolver: zodResolver(SignUpSchama),
//     defaultValues: {
//       userName: '',
//       email: '',
//       password: '',
//       adminCode: '',
//     },
//   });
//   const [, setCookie] = useCookies([ 
//     "token",
//     "userName",
//     "email",
//     "roles",
//     "userId",
//   ]);
  
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [signUp] = useSignUpMutation();

//   const onSubmit = async (data: LoginType) => {
//     try {
//       const result = await signUp(data).unwrap();
//       const { accessToken, newUser} = result;
//             setCookie("token", accessToken, { path: "/", maxAge: 3600 });
//             setCookie("userName", newUser.userName, { path: "/", maxAge: 3600 });
//             setCookie("email", newUser.email, { path: "/", maxAge: 3600 });
//             setCookie("roles", newUser.roles, { path: "/", maxAge: 3600 });
//             setCookie("userId", newUser._id, { path: "/", maxAge: 3600 });
//       dispatch(setUser(result.newUser));
//       console.log(result.newUser);  
//       reset();
//       const role = result.newUser.roles;
      
          
//       if (role === 'student') navigate('/HomeStudent');
//       else if (role === 'lacturer') navigate('/HomeLacturer');
//     } catch (err: any) {
//       console.error('Sign up error:', err);
//       alert(err?.data?.message || 'Registration failed');
//     }
//   };
//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <Typography className="login-title">Sign Up</Typography>

//         <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
//           <TextField
//             label="Username"
//             variant="outlined"
//             {...register('userName')}
//             error={!!errors.userName}
//             helperText={errors.userName?.message}
//             fullWidth
//           />

//           <TextField
//             label="Email"
//             variant="outlined"
//             {...register('email')}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//             fullWidth
//           />

//           <TextField
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             variant="outlined"
//             {...register('password')}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//             fullWidth
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={togglePasswordVisibility} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             label="Admin Code"
//             variant="outlined"
//             {...register('adminCode')}
//             error={!!errors.adminCode}
//             helperText={errors.adminCode?.message}
//             fullWidth
//           />

//           <Button variant="contained" color="primary" type="submit" fullWidth>
//             Sign Up
//           </Button>

//           <Typography variant="body2" sx={styles.bottomTextStyle}> {/* שימוש בסטייל המיובא */}
//             Already have an account?{' '}
//             <Box component="span" onClick={() => navigate('/')} sx={styles.signInLinkStyle}> {/* שימוש ב-Box ובסטייל המיובא */}
//               Sign In
//             </Box>
//           </Typography>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;




import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";
import { setUser } from '../redux/slice/authStateSlice';
import { useSignUpMutation } from '../redux/slice/api/authApi';
import { LoginType } from '../schema/SignUpSchama';
import SignUpSchama from '../schema/SignUpSchama';
import * as styles from './styles/SignUp'; // מייבא את כל ה־sx styles

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(SignUpSchama),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      adminCode: '',
    },
  });

  const [, setCookie] = useCookies([
    "token",
    "userName",
    "email",
    "roles",
    "userId",
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (data: LoginType) => {
    try {
      const result = await signUp(data).unwrap();
      const { accessToken, newUser } = result;
      setCookie("token", accessToken, { path: "/", maxAge: 3600 });
      setCookie("userName", newUser.userName, { path: "/", maxAge: 3600 });
      setCookie("email", newUser.email, { path: "/", maxAge: 3600 });
      setCookie("roles", newUser.roles, { path: "/", maxAge: 3600 });
      setCookie("userId", newUser._id, { path: "/", maxAge: 3600 });

      dispatch(setUser(newUser));
      reset();
      const role = newUser.roles;
      alert(role)
      if (role === 'student') navigate('/HomeStudent');
      else if (role === 'lecturer') navigate('/HomeLacturer');
    } catch (err: any) {
      console.error('Sign up error:', err);
      alert(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box sx={styles.loginContainerStyle}>
      <Box sx={styles.loginBoxStyle}>
        <Typography sx={styles.loginTitleStyle}>Sign Up</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={styles.loginFormStyle}
          noValidate
        >
          <TextField
            label="Username"
            variant="outlined"
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            fullWidth
          />

          <TextField
            label="Email"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Admin Code"
            variant="outlined"
            {...register('adminCode')}
            error={!!errors.adminCode}
            helperText={errors.adminCode?.message}
            fullWidth
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>

          <Typography variant="body2" sx={styles.bottomTextStyle}>
            Already have an account?{' '}
            <Box
              component="span"
              onClick={() => navigate('/')}
              sx={styles.signInLinkStyle}
            >
              Sign In
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
