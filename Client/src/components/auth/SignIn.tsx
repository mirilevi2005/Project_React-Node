import React, { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase"; // עדכן נתיב
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setPreviousLogin, setUser } from "../../redux/slice/authStateSlice"; // עדכן נתיב
import {
  useGoogleSignInMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  useVerifyTempPasswordMutation,
  useChangePasswordMutation,
  useSendMagicLinkMutation,
} from "../../redux/slice/api/authApi"; // עדכן נתיב
import { paperStyle, tabBoxStyle } from "../../css/signInStyles"; // עדכן נתיב

import {
  SignInSchema,
  TempPasswordSchema,
  NewPasswordSchema,
  SignInForm,
  TempPasswordForm,
  NewPasswordForm as NewPasswordFormType, // ניתן שם אחר למניעת התנגשות
} from "../../schema/SignIn"; // עדכן נתיב
import axios from "axios";

// ייבוא הקומפוננטות הקטנות
import PasswordSignInFormComponent from "./PasswordSignInForm";
import MagicLinkFormComponent from "./MagicLinkForm";
import ForgotPasswordFormComponent from "./ForgotPasswordForm";
import TemporaryPasswordFormComponent from "./TemporaryPasswordForm";
import NewPasswordFormComponent from "./NewPasswordForm";


const SignIn = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // כללי, בעיקר ל-MagicLink
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [tempPasswordEmail, setTempPasswordEmail] = useState("");
  const [showTempPasswordInput, setShowTempPasswordInput] = useState(false);
  const [tempPasswordVerified, setTempPasswordVerified] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sendMagicLink] = useSendMagicLinkMutation();
  const navigate = useNavigate();
  const [, setCookie] = useCookies([ // 'cookies' לא בשימוש ישיר, לכן '_'
    "token",
    "userName",
    "email",
    "roles",
    "userId",
  ]);
  const dispatch = useDispatch();

  // RTK Query mutations
  const [signInMutation, { isLoading: signInLoading }] = useSignInMutation();
  const [googleSignInMutation] = useGoogleSignInMutation();
  const [forgotPasswordMutation, { isLoading: forgotLoading }] = useForgotPasswordMutation();
  const [verifyTempPasswordMutation, { isLoading: verifyLoading }] = useVerifyTempPasswordMutation();
  const [changePasswordMutation, { isLoading: changeLoading }] = useChangePasswordMutation();

  // FORMS
  const signInMethods = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  });
  const tempPasswordMethods = useForm<TempPasswordForm>({
    resolver: zodResolver(TempPasswordSchema),
  });
  const newPasswordMethods = useForm<NewPasswordFormType>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // איפוס מצבים נלווים במעבר טאבים
    setShowForgotPassword(false);
    setShowTempPasswordInput(false);
    setTempPasswordVerified(false);
    setMagicLinkSent(false);
    signInMethods.reset();
    tempPasswordMethods.reset();
    newPasswordMethods.reset();
  };

  const sendTempPasswordToEmail = async (email: string) => {
    try {
      await forgotPasswordMutation({ email }).unwrap();
      alert('סיסמה זמנית נשלחה למייל שלך. בדוק את הדוא"ל והזן את הסיסמה הזמנית.');
      setTempPasswordEmail(email);
      setShowForgotPassword(false);
      setShowTempPasswordInput(true);
    } catch (err: any) {
      alert("שגיאה בשליחת סיסמה זמנית: " + (err?.data?.error || "שגיאה כללית"));
    }
  };

  const onSubmitTempPassword: SubmitHandler<TempPasswordForm> = async (data) => {
    try {
      await verifyTempPasswordMutation({
        email: tempPasswordEmail,
        tempPassword: data.tempPassword,
      }).unwrap();
      alert("הסיסמה הזמנית אומתה בהצלחה. כעת תוכל להגדיר סיסמה חדשה.");
      setTempPasswordVerified(true);
      tempPasswordMethods.reset();
    } catch (err: any) {
      alert("סיסמה זמנית שגויה או פג תוקף.");
    }
  };

  const onSubmitNewPassword: SubmitHandler<NewPasswordFormType> = async (data) => {
    try {
      await changePasswordMutation({
        email: tempPasswordEmail,
        newPassword: data.newPassword,
      }).unwrap();
      alert("הסיסמה שונתה בהצלחה. כעת תוכל להתחבר.");
      setTempPasswordEmail("");
      setShowTempPasswordInput(false);
      setTempPasswordVerified(false);
      newPasswordMethods.reset();
      setTabValue(0); // חזרה לטאב התחברות ראשי
    } catch (err: any) {
      alert("שגיאה בשינוי הסיסמה: " + (err?.data?.error || "שגיאה כללית"));
    }
  };

  const handlePasswordLogin: SubmitHandler<SignInForm> = async (data) => {
    // setIsLoading(true); // signInLoading כבר מנהל את זה
    try {
      const result = await signInMutation(data).unwrap();
      const { accessToken, newUser, previousLogin } = result;

      setCookie("token", accessToken, { path: "/", maxAge: 3600 });
      setCookie("userName", newUser.userName, { path: "/", maxAge: 3600 });
      setCookie("email", newUser.email, { path: "/", maxAge: 3600 });
      setCookie("roles", newUser.roles, { path: "/", maxAge: 3600 });
      setCookie("userId", newUser._id, { path: "/", maxAge: 3600 });

      dispatch(setUser(newUser));
      dispatch(setPreviousLogin(previousLogin));
      localStorage.setItem("previousLogin", String(previousLogin)); // לוודא שזה סטרינג

      signInMethods.reset();
      // alert(newUser.roles) // אפשר להסיר
      if (newUser.roles === "student") {
        navigate("/HomeStudent");
      } else if (newUser.roles === "lacturer") { // כדאי לוודא שהשם נכון lecturer
        navigate("/HomeLacturer");
      } else {
        navigate("/"); // נתיב ברירת מחדל
      }
    } catch (err: any) {
      alert(err?.data?.message || "התחברות נכשלה");
    } finally {
      // setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user.displayName || !user.email || !user.uid) {
        alert("Missing data from Google account.");
        return;
      }

      const response = await googleSignInMutation({
        email: user.email,
        userName: user.displayName,
      }).unwrap();
      const { accessToken: apiToken, newUser, previousLogin } = response;

      setCookie("token", apiToken, { path: "/", maxAge: 3600 });
      setCookie("userName", newUser.userName, { path: "/", maxAge: 3600 });
      // ... שאר ה-cookies וה-dispatch
      dispatch(setUser(newUser));
      dispatch(setPreviousLogin(previousLogin));
      localStorage.setItem("previousLogin", String(previousLogin));

      navigate(newUser.roles === "student" ? "/HomeStudent" : "/HomeLacturer");
    } catch (error: any) {
      console.error("Google login error:", error);
      alert("Google login failed: " + (error?.message || "Unknown error"));
    }
  };

const handleMagicLinkLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!magicEmail) {
    alert("אנא הזן כתובת אימייל.");
    return;
  }

  try {
    const result = await sendMagicLink({ email: magicEmail }).unwrap();
    setMagicLinkSent(true);
    console.log("הקישור נשלח בהצלחה:", result);
    alert(result)
     dispatch(setUser(result));
    
  } catch (error) {
    console.error("שגיאה בשליחת הקישור:", error);
    alert("אירעה שגיאה בשליחת הקישור. נסה שוב מאוחר יותר.");
  }
};

// const handleMagicLinkLogin = async () => {
//   try {
//     const result = await sendMagicLink({ email: magicEmail }).unwrap();
//     const userInfo=result
//     setMagicLinkSent(true);
//     console.log("הקישור נשלח בהצלחה:", result);

//      setCookie("token", result.token, { path: "/", maxAge: 3600 });
//       setCookie("userName", result.userName, { path: "/", maxAge: 3600 });
//       setCookie("email", result.email, { path: "/", maxAge: 3600 });
//       setCookie("roles", result.roles, { path: "/", maxAge: 3600 });
//       setCookie("userId", result._id, { path: "/", maxAge: 3600 });

//       dispatch(setUser(userInfo));

//     // שמירת המידע ברדוקס
//     alert("קישור התחברות נשלח למייל");
//   } catch (error) {
//     console.error("שגיאה בשליחת הקישור:", error);
//     alert("אירעה שגיאה בשליחת הקישור. נסה שוב מאוחר יותר.");
//   }
// };


  return (
    <Paper elevation={3} sx={paperStyle}>
      <Box sx={tabBoxStyle}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" centered>
          <Tab label="התחברות עם סיסמה" />
          <Tab label="אימות אימייל" />
        </Tabs>
      </Box>

      {/* טאב התחברות רגילה */}
      {tabValue === 0 && !showForgotPassword && !showTempPasswordInput && !tempPasswordVerified && (
        <FormProvider {...signInMethods}>
          <PasswordSignInFormComponent
            onPasswordLogin={handlePasswordLogin}
            onGoogleLogin={handleGoogleLogin}
            onForgotPassword={() => setShowForgotPassword(true)}
            onNavigateToSignUp={() => navigate("/signup")}
            isLoading={isLoading} // או signInLoading, תלוי בהקשר
            signInLoading={signInLoading}
          />
        </FormProvider>
      )}

      {/* טאב אימות אימייל (קישור קסם) */}
      {tabValue === 1 && !showForgotPassword && !showTempPasswordInput && !tempPasswordVerified && (
         <MagicLinkFormComponent
            magicEmail={magicEmail}
            onMagicEmailChange={(e) => setMagicEmail(e.target.value)}
            onMagicLinkLogin={handleMagicLinkLogin}
            magicLinkSent={magicLinkSent}
            onSetMagicLinkSent={setMagicLinkSent}
            isLoading={isLoading}
          />
      )}

      {/* טאב שכחת סיסמה */}
      {showForgotPassword && (
        <ForgotPasswordFormComponent
            onSendTempPassword={sendTempPasswordToEmail}
            onBack={() => setShowForgotPassword(false)}
            isLoading={forgotLoading}
        />
      )}

      {/* טאב הזנת סיסמה זמנית */}
      {showTempPasswordInput && !tempPasswordVerified && (
        <FormProvider {...tempPasswordMethods}>
            <TemporaryPasswordFormComponent
                onSubmit={onSubmitTempPassword}
                isLoading={verifyLoading}
            />
        </FormProvider>
      )}

      {/* טאב שינוי סיסמה לאחר אימות זמני */}
      {tempPasswordVerified && (
        <FormProvider {...newPasswordMethods}>
            <NewPasswordFormComponent
                onSubmit={onSubmitNewPassword}
                isLoading={changeLoading}
            />
        </FormProvider>
      )}
    </Paper>
  );
};

export default SignIn;