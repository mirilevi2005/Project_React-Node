
import React, { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase"; 
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setPreviousLogin, setUser } from "../../redux/slice/authStateSlice";
import {
  useGoogleSignInMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  useVerifyTempPasswordMutation,
  useChangePasswordMutation,
  useSendMagicLinkMutation,
} from "../../redux/slice/api/authApi"; 
import { paperStyle, tabBoxStyle } from "../styles/signInStyles"; 

import {
  SignInSchema,
  TempPasswordSchema,
  NewPasswordSchema,
  SignInForm,
  TempPasswordForm,
  NewPasswordForm as NewPasswordFormType, 
} from "../../schema/SignIn"; 
import MagicLinkFormComponent from "./MagicLinkForm";
import ForgotPasswordFormComponent from "./ForgotPasswordForm";
import TemporaryPasswordFormComponent from "./TemporaryPasswordForm";
import NewPasswordFormComponent from "./NewPasswordForm";
import PasswordSignInForm from "./PasswordSignInForm";

const SignIn = () => {
  const [tabValue, setTabValue] = useState(0);
  // const [isLoading, setIsLoading] = useState(false); 
  const [isLoading] = useState(false); 
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [tempPasswordEmail, setTempPasswordEmail] = useState("");
  const [showTempPasswordInput, setShowTempPasswordInput] = useState(false);
  const [tempPasswordVerified, setTempPasswordVerified] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sendMagicLink] = useSendMagicLinkMutation();
  const navigate = useNavigate();
  const [, setCookie] = useCookies([
    "token",
    "userName",
    "email",
    "roles",
    "userId",
  ]);
  const dispatch = useDispatch();

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

  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  const handleTabChange = ( newValue: number) => {
    setTabValue(newValue);
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
      setTempPasswordEmail(email);
      setShowForgotPassword(false);
      setShowTempPasswordInput(true);
    } catch (err: any) {
      alert("Error sending temporary password: " + (err?.data?.error || "General error"));
    }
  };

  const onSubmitTempPassword: SubmitHandler<TempPasswordForm> = async (data) => {
    try {
      await verifyTempPasswordMutation({
        email: tempPasswordEmail,
        tempPassword: data.tempPassword,
      }).unwrap();
      setTempPasswordVerified(true);
      tempPasswordMethods.reset();
    } catch (err: any) {
      alert("Temporary password is incorrect or expired.");
    }
  };

  const onSubmitNewPassword: SubmitHandler<NewPasswordFormType> = async (data) => {
    try {
      await changePasswordMutation({
        email: tempPasswordEmail,
        newPassword: data.newPassword,
      }).unwrap();
      alert("Password changed successfully. You can now sign in.");
      setTempPasswordEmail("");
      setShowTempPasswordInput(false);
      setTempPasswordVerified(false);
      newPasswordMethods.reset();
      setTabValue(0);
    } catch (err: any) {
      alert("Error changing password: " + (err?.data?.error || "General error"));
    }
  };

  const handlePasswordLogin: SubmitHandler<SignInForm> = async (data) => {
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
      localStorage.setItem("previousLogin", String(previousLogin));
      signInMethods.reset();
      if (newUser.roles === "student") {
        navigate("/HomeStudent");
      } else if (newUser.roles === "lecturer") {
        navigate("/HomeLecturer");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      alert(err?.data?.message || "Login failed");
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
      setCookie("email", newUser.email, { path: "/", maxAge: 3600 });
      setCookie("roles", newUser.roles, { path: "/", maxAge: 3600 });
      setCookie("userId", newUser._id, { path: "/", maxAge: 3600 });
      dispatch(setUser(newUser));
      dispatch(setPreviousLogin(previousLogin));
      localStorage.setItem("previousLogin", String(previousLogin));
      navigate(newUser.roles === "student" ? "/HomeStudent" : "/HomeLecturer");
    } catch (error: any) {
      console.error("Google login error:", error);
      alert("Google login failed: " + (error?.message || "Unknown error"));
    }
  };

  const handleMagicLinkLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!magicEmail) {
      alert("Please enter an email address.");
      return;
    }

    try {
      const result = await sendMagicLink({ email: magicEmail }).unwrap();
      setMagicLinkSent(true);
      alert(result);
      dispatch(setUser(result));
    } catch (error) {
      console.error("Error sending magic link:", error);
      alert("An error occurred while sending the link. Please try again later.");
    }
  };

  return (
    <Paper elevation={3} sx={paperStyle}>
      <Box sx={tabBoxStyle}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" centered>
          <Tab label="Sign in with Password" />
          <Tab label="Email Verification" />
        </Tabs>
      </Box>

      {tabValue === 0 && !showForgotPassword && !showTempPasswordInput && !tempPasswordVerified && (
        <FormProvider {...signInMethods}>
          <PasswordSignInForm
            onPasswordLogin={handlePasswordLogin}
            onGoogleLogin={handleGoogleLogin}
            onForgotPassword={() => setShowForgotPassword(true)}
            onNavigateToSignUp={() => navigate("/signup")}
            isLoading={isLoading}
            signInLoading={signInLoading}
          />
        </FormProvider>
      )}
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
    
{tabValue === 0 && showForgotPassword && (
  <ForgotPasswordFormComponent
    onSendTempPassword={sendTempPasswordToEmail}
    onBack={() => setShowForgotPassword(false)}
    isLoading={forgotLoading}
  />
)}

{tabValue === 0 && showTempPasswordInput && !tempPasswordVerified && (
  <FormProvider {...tempPasswordMethods}>
    <TemporaryPasswordFormComponent
      onSubmit={onSubmitTempPassword}
      isLoading={verifyLoading}
    />
  </FormProvider>
)}

{tabValue === 0 && tempPasswordVerified && (
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
