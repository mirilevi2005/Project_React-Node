import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/slice/authStateSlice"; // עדכון ה-state
import '../css/SignUp.css';
import SignUpSchama, { LoginType } from '../schema/SignUpSchama';

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(SignUpSchama),  // החיבור עם zodResolver
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      adminCode: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // פונקציית onSubmit
const onSubmit = async (data: LoginType) => {
  try {
    const res = await fetch('http://localhost:8080/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include' // זהו הכרחי אם אתה משתמש ב-CORS עם cookies
    });

    const result = await res.json();

    if (res.ok) {
      reset(); // איפוס הטופס
      // ודא ש- user קיים לפני שאתה שולף ממנו מידע
      if (result.newUser) {
        const { roles } = result.newUser; // אם השרת מחזיר את ה-role של המשתמש
        
        // עדכון ה-state הגלובלי עם פרטי המשתמש
        dispatch(setUser(result.newUser));
        console.log(result.newUser.userName);
        
        // ניווט לפי ה-role
        if (roles === 'student') {
          navigate("/HomeStudent");
        } else if (roles === 'lacturer') {
          navigate("/HomeLacturer");
        } 
      } else {
        alert("User data is missing.");
      }
    } else {
      alert(result.message || "Registration failed");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Server error");
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

          <TextField
            label="Admin Code"
            variant="outlined"
            {...register("adminCode")}
            error={!!errors.adminCode}
            helperText={errors.adminCode?.message}
            fullWidth
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Already have an account? <span onClick={() => navigate("/")} style={{ color: 'blue', cursor: 'pointer' }}>Sign In</span>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
