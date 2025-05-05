import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { setUser } from '../redux/slice/authStateSlice';
import { useSignUpMutation } from '../redux/slice/api/authApi';
import { LoginType } from '../schema/SignUpSchama';
import SignUpSchama from '../schema/SignUpSchama';
import '../css/SignUp.css';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(SignUpSchama),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      adminCode: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUp] = useSignUpMutation();

  const onSubmit = async (data: LoginType) => {
    try {
      const result = await signUp(data).unwrap(); // result is of type AuthResponse
      dispatch(setUser(result.newUser));
      console.log(result.newUser);
      
      reset();

      const role = result.newUser.roles;

      if (role === 'student') navigate('/HomeStudent');
      else if (role === 'lacturer') navigate('/HomeLacturer');
    } catch (err: any) {
      console.error('Sign up error:', err);
      alert(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Typography className="login-title">Sign Up</Typography>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/')} style={{ color: 'blue', cursor: 'pointer' }}>
              Sign In
            </span>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
