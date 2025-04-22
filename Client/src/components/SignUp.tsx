import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import SignUpSchama, { LoginType } from '../schema/SignUpSchama';

import '../css/SignUp.css'; // Import the styles

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(SignUpSchama)
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const onSubmit = (data: LoginType) => {
    console.log(data);
    reset();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Typography className="login-title">SignUp</Typography>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Username"
            variant="outlined"
            {...register("userName")}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            fullWidth
          />

          <TextField
            label="Email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            {...register("password")}
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
              )
            }}
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
          SignUp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
