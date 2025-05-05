import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { signInWithPopup, sendSignInLinkToEmail } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/authStateSlice";
import { useGoogleSignInMutation } from "../redux/slice/api/authApi";

const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

type SignInForm = z.infer<typeof SignInSchema>;

const actionCodeSettings = {
  url: "http://localhost:8080/HomeLacturer",
  handleCodeInApp: true
};

const SignIn = () => {
  const [tabValue, setTabValue] = useState(0);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token", "userName", "email", "roles", "userId"]);
  const dispatch = useDispatch();
  const [googleSignIn] = useGoogleSignInMutation();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema)
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePasswordLogin = async (data: SignInForm) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        reset();
        const { accessToken, user } = result;

        // שמירת הנתונים בעוגיות
        setCookie("token", accessToken, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });
        setCookie("userName", user.userName, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });
        setCookie("email", user.email, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });
        setCookie("roles", user.roles, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });
        setCookie("userId", user._id, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });

        dispatch(setUser(user));

        if (user.roles === "student") {
          navigate("/HomeStudent");
        } else if (user.roles === "lacturer") {
          navigate("/HomeLacturer");
        }
      } else {
        alert(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendSignInLinkToEmail(auth, magicEmail, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", magicEmail);
      setMagicLinkSent(true);
    } catch (error) {
      console.error("Failed to send sign-in link", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, uid } = result.user;
  
      if (!displayName || !email || !uid) {
        alert("Missing data from Google account.");
        return;
      }
  
      const response = await googleSignIn({
        email,
        userName: displayName
      }).unwrap();
  
      const { accessToken: apiToken, user } = response;
  
      // שמירת הנתונים בעוגיות
      setCookie("token", apiToken, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });
      setCookie("userName", user.userName, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });
      setCookie("email", user.email, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });
      setCookie("roles", user.roles, { path: "/", maxAge: 3600, sameSite: "lax", secure: false });  
      dispatch(setUser(user));
  
      navigate(user.roles === "student" ? "/HomeStudent" : "/HomeLacturer");
  
    } catch (error) {
      console.error("Google login failed", error);
      alert("Google login failed");
    }
  };
  

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3, maxWidth: 500, mx: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Password" />
          <Tab label="Email Verification" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box
          component="form"
          onSubmit={handleSubmit(handlePasswordLogin)}
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
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
          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ pt: 3 }}>
          {magicLinkSent ? (
            <Box
              sx={{
                textAlign: "center",
                py: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2
              }}
            >
              <MailOutlineIcon sx={{ fontSize: 48, color: "text.secondary" }} />
              <Typography variant="h6">Check your email</Typography>
              <Typography variant="body2" color="text.secondary">
                We've sent a sign-in link to <b>{magicEmail}</b>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Didn’t get it?
                <Button
                  onClick={() => setMagicLinkSent(false)}
                  sx={{ ml: 0.5, textTransform: "none", p: 0 }}
                >
                  Try again
                </Button>
              </Typography>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleMagicLinkLogin}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Email address"
                type="email"
                fullWidth
                required
                value={magicEmail}
                onChange={(e) => setMagicEmail(e.target.value)}
              />
              <Typography variant="body2" color="text.secondary">
                We'll send a sign-in link to your email so you can log in without a password.
              </Typography>
              <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Sign-in Link"}
              </Button>
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        <Divider>
          <Typography variant="caption" sx={{ px: 1, color: "text.secondary" }}>
            Or continue with
          </Typography>
        </Divider>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{ mt: 2 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Paper>
  );
};

export default SignIn;

















