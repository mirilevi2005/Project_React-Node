import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setPreviousLogin, setUser } from "../redux/slice/authStateSlice";
import {
  useGoogleSignInMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  useVerifyTempPasswordMutation,
  useChangePasswordMutation,
} from "../redux/slice/api/authApi";
import SignUp from "./SignUp";

const SignInSchema = z.object({
  email: z.string().email("אימייל לא חוקי"),
  password: z.string().min(8, "הסיסמה חייבת להיות לפחות 8 תווים"),
});

type SignInForm = z.infer<typeof SignInSchema>;

const TempPasswordSchema = z.object({
  tempPassword: z.string().min(1, "אנא הזן את הסיסמה הזמנית"),
});

type TempPasswordForm = z.infer<typeof TempPasswordSchema>;

const NewPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "הסיסמה חייבת להיות לפחות 8 תווים"),
    confirmNewPassword: z.string().min(8, "אשר את הסיסמה החדשה"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "הסיסמאות לא תואמות",
    path: ["confirmNewPassword"],
  });

type NewPasswordForm = z.infer<typeof NewPasswordSchema>;

const SignIn: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [tempPasswordEmail, setTempPasswordEmail] = useState("");
  const [showTempPasswordInput, setShowTempPasswordInput] = useState(false);
  const [tempPasswordVerified, setTempPasswordVerified] = useState(false);

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([
    "token",
    "userName",
    "email",
    "roles",
    "userId",
  ]);
  const dispatch = useDispatch();

  // RTK Query mutations
  const [signIn, { isLoading: signInLoading }] = useSignInMutation();
  const [googleSignIn] = useGoogleSignInMutation();
  const [forgotPassword, { isLoading: forgotLoading }] =
    useForgotPasswordMutation();
  const [verifyTempPassword, { isLoading: verifyLoading }] =
    useVerifyTempPasswordMutation();
  const [changePassword, { isLoading: changeLoading }] =
    useChangePasswordMutation();

  // FORMS
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  });

  const {
    register: registerTemp,
    handleSubmit: handleSubmitTemp,
    formState: { errors: errorsTemp },
  } = useForm<TempPasswordForm>({
    resolver: zodResolver(TempPasswordSchema),
  });

  const {
    register: registerNewPass,
    handleSubmit: handleSubmitNewPass,
    formState: { errors: errorsNewPass },
    reset: resetNewPassForm,
  } = useForm<NewPasswordForm>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // שליחת סיסמה זמנית למייל
  const sendTempPasswordToEmail = async (email: string) => {
    try {
      await forgotPassword({ email }).unwrap();
      alert(
        'סיסמה זמנית נשלחה למייל שלך. בדוק את הדוא"ל והזן את הסיסמה הזמנית.'
      );
      setTempPasswordEmail(email);
      setShowForgotPassword(false);
      setShowTempPasswordInput(true);
    } catch (err: any) {
      alert("שגיאה בשליחת סיסמה זמנית: " + (err?.data?.error || "שגיאה כללית"));
    }
  };

  // אימות הסיסמה הזמנית שהתקבלה
  const onSubmitTempPassword = async (data: TempPasswordForm) => {
    try {
      await verifyTempPassword({
        email: tempPasswordEmail,
        tempPassword: data.tempPassword,
      }).unwrap();
      alert("הסיסמה הזמנית אומתה בהצלחה. כעת תוכל להגדיר סיסמה חדשה.");
      setTempPasswordVerified(true);
    } catch (err: any) {
      alert("סיסמה זמנית שגויה או פג תוקף.");
    }
  };

  // שליחת הסיסמה החדשה לשינוי
  const onSubmitNewPassword = async (data: NewPasswordForm) => {
    try {
      await changePassword({
        email: tempPasswordEmail,
        newPassword: data.newPassword,
      }).unwrap();
      alert("הסיסמה שונתה בהצלחה. כעת תוכל להתחבר.");
      // אתחל סטייטים וחזור לטאב ההתחברות הרגילה
      setTempPasswordEmail("");
      setShowTempPasswordInput(false);
      setTempPasswordVerified(false);
      resetNewPassForm();
      setTabValue(0);
    } catch (err: any) {
      alert("שגיאה בשינוי הסיסמה: " + (err?.data?.error || "שגיאה כללית"));
    }
  };

  // התחברות רגילה עם אימייל וסיסמה
  const handlePasswordLogin = async (data: SignInForm) => {
    setIsLoading(true);
    try {
      const result = await signIn(data).unwrap();

      const { accessToken, newUser, previousLogin } = result;

      setCookie("token", accessToken, { path: "/", maxAge: 3600 });
      setCookie("userName", newUser.userName, { path: "/", maxAge: 3600 });
      setCookie("email", newUser.email, { path: "/", maxAge: 3600 });
      setCookie("roles", newUser.roles, { path: "/", maxAge: 3600 });
      setCookie("userId", newUser._id, { path: "/", maxAge: 3600 });

      dispatch(setUser(newUser));
      dispatch(setPreviousLogin(previousLogin));
      localStorage.setItem("previousLogin", previousLogin);

      reset();

      if (newUser.roles === "student") {
        navigate("/HomeStudent");
      } else if (newUser.roles === "lacturer") {
        navigate("/HomeLacturer");
      }
    } catch (err: any) {
      alert(err?.data?.message || "התחברות נכשלה");
    } finally {
      setIsLoading(false);
    }
  };

  // התחברות עם Google OAuth באמצעות Firebase + RTK Query
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
        userName: displayName,
      }).unwrap();

      const { accessToken: apiToken, newUser, previousLogin } = response;

      setCookie("token", apiToken, { path: "/", maxAge: 3600 });
      setCookie("userName", newUser.userName, { path: "/", maxAge: 3600 });
      setCookie("email", newUser.email, { path: "/", maxAge: 3600 });
      setCookie("roles", newUser.roles, { path: "/", maxAge: 3600 });
      setCookie("userId", newUser._id, { path: "/", maxAge: 3600 });

      dispatch(setUser(newUser));
      dispatch(setPreviousLogin(previousLogin));
      localStorage.setItem("previousLogin", previousLogin);

      navigate(newUser.roles === "student" ? "/HomeStudent" : "/HomeLacturer");
    } catch (error) {
      alert("Google login failed");
    }
  };

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3, maxWidth: 500, mx: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="התחברות עם סיסמה" />
          <Tab label="אימות אימייל" />
        </Tabs>
      </Box>

      {/* טאב התחברות רגילה */}
      {tabValue === 0 && !showForgotPassword && !showTempPasswordInput && (
        <Box
          component="form"
          onSubmit={handleSubmit(handlePasswordLogin)}
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
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
            sx={{ textTransform: "none" }}
            onClick={() => setShowForgotPassword(true)}
          >
            שכחת סיסמה?
          </Button>
          <Typography sx={{ mt: 3, textAlign: "center" }}>
            אין לך חשבון?{" "}
            <Button variant="text" onClick={() => navigate("/signup")}>
              הירשם כאן
            </Button>
          </Typography>

          <Divider>או</Divider>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
          >
            התחברות עם Google
          </Button>
        </Box>
      )}

      {/* טאב שכחת סיסמה - שליחת סיסמה זמנית */}
      {showForgotPassword && (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            const email = (e.target as any).email.value;
            sendTempPasswordToEmail(email);
          }}
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography>הכנס את כתובת המייל שלך לקבלת סיסמה זמנית:</Typography>
          <TextField
            name="email"
            label="אימייל"
            fullWidth
            required
            type="email"
          />
          <Button type="submit" variant="contained" disabled={forgotLoading}>
            {forgotLoading ? "שולח..." : "שלח סיסמה זמנית"}
          </Button>
          <Button onClick={() => setShowForgotPassword(false)}>חזרה</Button>
        </Box>
      )}

      {/* טאב הזנת סיסמה זמנית */}
      {showTempPasswordInput && !tempPasswordVerified && (
        <Box
          component="form"
          onSubmit={handleSubmitTemp(onSubmitTempPassword)}
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography>הזן את הסיסמה הזמנית שקיבלת בדוא"ל:</Typography>
          <TextField
            label="סיסמה זמנית"
            fullWidth
            error={!!errorsTemp.tempPassword}
            helperText={errorsTemp.tempPassword?.message}
            {...registerTemp("tempPassword")}
          />
          <Button type="submit" variant="contained" disabled={verifyLoading}>
            {verifyLoading ? "מאמת..." : "אימות סיסמה זמנית"}
          </Button>
        </Box>
      )}

      {/* טאב שינוי סיסמה לאחר אימות זמני */}
      {tempPasswordVerified && (
        <Box
          component="form"
          onSubmit={handleSubmitNewPass(onSubmitNewPassword)}
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography>הזן סיסמה חדשה:</Typography>
          <TextField
            label="סיסמה חדשה"
            type="password"
            fullWidth
            error={!!errorsNewPass.newPassword}
            helperText={errorsNewPass.newPassword?.message}
            {...registerNewPass("newPassword")}
          />
          <TextField
            label="אישור סיסמה חדשה"
            type="password"
            fullWidth
            error={!!errorsNewPass.confirmNewPassword}
            helperText={errorsNewPass.confirmNewPassword?.message}
            {...registerNewPass("confirmNewPassword")}
          />
          <Button type="submit" variant="contained" disabled={changeLoading}>
            {changeLoading ? "מעדכן..." : "עדכן סיסמה"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default SignIn;
