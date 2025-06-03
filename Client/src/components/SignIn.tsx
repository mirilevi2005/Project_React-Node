// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Divider,
//   Paper,
//   Tab,
//   Tabs,
//   TextField,
//   Typography,
// } from "@mui/material";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import GoogleIcon from "@mui/icons-material/Google";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { z } from "zod";
// import { useDispatch } from "react-redux";
// import { setPreviousLogin, setUser } from "../redux/slice/authStateSlice";
// import {
//   useGoogleSignInMutation,
//   useSignInMutation,
//   useForgotPasswordMutation,
//   useVerifyTempPasswordMutation,
//   useChangePasswordMutation,
// } from "../redux/slice/api/authApi";
// import SignUp from "./SignUp";
// import {
//   paperStyle,
//   tabBoxStyle,
//   formStyle,
//   tempFormStyle,
//   centerTextStyle,
// } from "../css/signInStyles";

// import {
//   SignInSchema,
//   TempPasswordSchema,
//   NewPasswordSchema,
//   SignInForm,
//   TempPasswordForm,
//   NewPasswordForm,
// }  from "../schema/SignIn";
// import axios from "axios";

// const SignIn = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [tempPasswordEmail, setTempPasswordEmail] = useState("");
//   const [showTempPasswordInput, setShowTempPasswordInput] = useState(false);
//   const [tempPasswordVerified, setTempPasswordVerified] = useState(false);
//  const [magicEmail, setMagicEmail] = useState("");
//  const [magicLinkSent, setMagicLinkSent] = useState(false);
//   const navigate = useNavigate();
//   const [cookies, setCookie] = useCookies([
//     "token",
//     "userName",
//     "email",
//     "roles",
//     "userId",
//   ]);
//   const dispatch = useDispatch();

//   // RTK Query mutations
//   const [signIn, { isLoading: signInLoading }] = useSignInMutation();
//   const [googleSignIn] = useGoogleSignInMutation();
//   const [forgotPassword, { isLoading: forgotLoading }] =
//     useForgotPasswordMutation();
//   const [verifyTempPassword, { isLoading: verifyLoading }] =
//     useVerifyTempPasswordMutation();
//   const [changePassword, { isLoading: changeLoading }] =
//     useChangePasswordMutation();

//   // FORMS
//    const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<SignInForm>({
//     resolver: zodResolver(SignInSchema),
//   });

//   const {
//     register: registerTemp,
//     handleSubmit: handleSubmitTemp,
//     formState: { errors: errorsTemp },
//     reset: resetTemp,
//   } = useForm<TempPasswordForm>({
//     resolver: zodResolver(TempPasswordSchema),
//   });

//   const {
//     register: registerNewPass,
//     handleSubmit: handleSubmitNewPass,
//     formState: { errors: errorsNewPass },
//     reset: resetNewPass,
//   } = useForm<NewPasswordForm>({
//     resolver: zodResolver(NewPasswordSchema),
//   });

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const sendTempPasswordToEmail = async (email: string) => {
//     try {
//       await forgotPassword({ email }).unwrap();
//       alert(
//         'סיסמה זמנית נשלחה למייל שלך. בדוק את הדוא"ל והזן את הסיסמה הזמנית.'
//       );
//       setTempPasswordEmail(email);
//       setShowForgotPassword(false);
//       setShowTempPasswordInput(true);
//     } catch (err: any) {
//       alert("שגיאה בשליחת סיסמה זמנית: " + (err?.data?.error || "שגיאה כללית"));
//     }
//   };

//   const onSubmitTempPassword = async (data: TempPasswordForm) => {
//     try {
//       await verifyTempPassword({
//         email: tempPasswordEmail,
//         tempPassword: data.tempPassword,
//       }).unwrap();
//       alert("הסיסמה הזמנית אומתה בהצלחה. כעת תוכל להגדיר סיסמה חדשה.");
//       setTempPasswordVerified(true);
//       resetTemp();
//     } catch (err: any) {
//       alert("סיסמה זמנית שגויה או פג תוקף.");
//     }
//   };

//   const onSubmitNewPassword = async (data: NewPasswordForm) => {
//     try {
//       await changePassword({
//         email: tempPasswordEmail,
//         newPassword: data.newPassword,
//       }).unwrap();
//       alert("הסיסמה שונתה בהצלחה. כעת תוכל להתחבר.");
//       setTempPasswordEmail("");
//       setShowTempPasswordInput(false);
//       setTempPasswordVerified(false);
//       resetNewPass();
//       setTabValue(0);
//     } catch (err: any) {
//       alert("שגיאה בשינוי הסיסמה: " + (err?.data?.error || "שגיאה כללית"));
//     }
//   };

//   const handlePasswordLogin = async (data: SignInForm) => {
//     setIsLoading(true);
//     try {
//       const result = await signIn(data).unwrap();

//       const { accessToken, newUser, previousLogin } = result;

//       setCookie("token", accessToken, { path: "/", maxAge: 3600 });
//       setCookie("userName", newUser.userName, { path: "/", maxAge: 3600 });
//       setCookie("email", newUser.email, { path: "/", maxAge: 3600 });
//       setCookie("roles", newUser.roles, { path: "/", maxAge: 3600 });
//       setCookie("userId", newUser._id, { path: "/", maxAge: 3600 });

//       dispatch(setUser(newUser));
//       dispatch(setPreviousLogin(previousLogin));
//       localStorage.setItem("previousLogin", previousLogin);

//       reset();
// alert(newUser.roles )
//       if (newUser.roles === "student") {
//         navigate("/HomeStudent");
//       } else if (newUser.roles === "lacturer") {
//         navigate("/HomeLacturer");
//       }
//     } catch (err: any) {
//       alert(err?.data?.message || "התחברות נכשלה");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // התחברות עם Google OAuth באמצעות Firebase + RTK Query
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const { displayName, email, uid } = result.user;

//       if (!displayName || !email || !uid) {
//         alert("Missing data from Google account.");
//         return;
//       }

//       const response = await googleSignIn({
//         email,
//         userName: displayName,
//       }).unwrap();

//       const { accessToken: apiToken, newUser, previousLogin } = response;

//       setCookie("token", apiToken, { path: "/", maxAge: 3600 });
//       setCookie("userName", newUser.userName, { path: "/", maxAge: 3600 });
//       setCookie("email", newUser.email, { path: "/", maxAge: 3600 });
//       setCookie("roles", newUser.roles, { path: "/", maxAge: 3600 });
//       setCookie("userId", newUser._id, { path: "/", maxAge: 3600 });

//       dispatch(setUser(newUser));
//       dispatch(setPreviousLogin(previousLogin));
//       localStorage.setItem("previousLogin", previousLogin);

//       navigate(newUser.roles === "student" ? "/HomeStudent" : "/HomeLacturer");
//     } catch (error) {
//       alert("Google login failed");
//     }
//   };




//   const handleMagicLinkLogin = async () => {
 
//   try {
//     setIsLoading(true);
//     await axios.post("http://localhost:8080/send-magic-link", {
//       email: magicEmail,
//     });
//     setMagicLinkSent(true);
//   } catch (err) {
//     console.error("שגיאה בשליחת הקישור", err);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//    <Paper elevation={3} sx={paperStyle}>
//     <Box sx={tabBoxStyle}>
//       <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
//         <Tab label="התחברות עם סיסמה" />
//         <Tab label="אימות אימייל" />
//       </Tabs>
//     </Box>

//     {/* טאב התחברות רגילה */}
//     {tabValue === 0 && !showForgotPassword && !showTempPasswordInput && (
//       <Box component="form" onSubmit={handleSubmit(handlePasswordLogin)} sx={formStyle}>
//         <TextField
//           label="אימייל"
//           fullWidth
//           error={!!errors.email}
//           helperText={errors.email?.message}
//           {...register("email")}
//         />
//         <TextField
//           label="סיסמה"
//           type="password"
//           fullWidth
//           error={!!errors.password}
//           helperText={errors.password?.message}
//           {...register("password")}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           disabled={isLoading || signInLoading}
//         >
//           {isLoading || signInLoading ? "מתחבר..." : "התחבר"}
//         </Button>
//         <Button
//           sx={{ textTransform: "none" }}
//           onClick={() => setShowForgotPassword(true)}
//         >
//           שכחת סיסמה?
//         </Button>
//         <Typography sx={centerTextStyle}>
//           אין לך חשבון?{" "}
//           <Button variant="text" onClick={() => navigate("/signup")}>
//             הירשם כאן
//           </Button>
//         </Typography>

//         <Divider>או</Divider>
//         <Button
//           variant="outlined"
//           fullWidth
//           startIcon={<GoogleIcon />}
//           onClick={handleGoogleLogin}
//         >
//           התחברות עם Google
//         </Button>
//       </Box>
//     )}

    
//       {tabValue === 1 && (
//         <Box sx={{ pt: 3 }}>
//           {magicLinkSent ? (
//             <Box
//               sx={{
//                 textAlign: "center",
//                 py: 2,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: 2
//               }}
//             >
              
//               < MailOutlineIcon sx={{ fontSize: 48, color: "text.secondary" }} />
//               <Typography variant="h6">Check your email</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 We've sent a sign-in link to <b>{magicEmail}</b>
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 Didn’t get it?
//                 <Button
//                   onClick={() => setMagicLinkSent(false)}
//                   sx={{ ml: 0.5, textTransform: "none", p: 0 }}
//                 >
//                   Try again
//                 </Button>
//               </Typography>
//             </Box>
//           ) : (
//             <Box
//               component="form"
//               onSubmit={handleMagicLinkLogin}
//               sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//             >
//               <TextField
//                 label="Email address"
//                 type="email"
//                 fullWidth
//                 required
//                 value={magicEmail}
//                 onChange={(e) => setMagicEmail(e.target.value)}
//               />
//               <Typography variant="body2" color="text.secondary">
//                 We'll send a sign-in link to your email so you can log in without a password.
//               </Typography>
//               <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
//                 {isLoading ? "Sending..." : "Send Sign-in Link"}
//               </Button>
//             </Box>
//           )}
//         </Box>
//       )}

//     {/* טאב שכחת סיסמה */}
//     {showForgotPassword && (
//       <Box
//         component="form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           const email = (e.target as any).email.value;
//           sendTempPasswordToEmail(email);
//         }}
//         sx={tempFormStyle}
//       >
//         <Typography>הכנס את כתובת המייל שלך לקבלת סיסמה זמנית:</Typography>
//         <TextField name="email" label="אימייל" fullWidth required type="email" />
//         <Button type="submit" variant="contained" disabled={forgotLoading}>
//           {forgotLoading ? "שולח..." : "שלח סיסמה זמנית"}
//         </Button>
//         <Button onClick={() => setShowForgotPassword(false)}>חזרה</Button>
//       </Box>
//     )}

//     {/* טאב הזנת סיסמה זמנית */}
//     {showTempPasswordInput && !tempPasswordVerified && (
//       <Box
//         component="form"
//         onSubmit={handleSubmitTemp(onSubmitTempPassword)}
//         sx={tempFormStyle}
//       >
//         <Typography>הזן את הסיסמה הזמנית שקיבלת בדוא"ל:</Typography>
//         <TextField
//           label="סיסמה זמנית"
//           fullWidth
//           error={!!errorsTemp.tempPassword}
//           helperText={errorsTemp.tempPassword?.message}
//           {...registerTemp("tempPassword")}
//         />
//         <Button type="submit" variant="contained" disabled={verifyLoading}>
//           {verifyLoading ? "מאמת..." : "אימות סיסמה זמנית"}
//         </Button>
//       </Box>
//     )}

//     {/* טאב שינוי סיסמה לאחר אימות זמני */}
//     {tempPasswordVerified && (
//       <Box
//         component="form"
//         onSubmit={handleSubmitNewPass(onSubmitNewPassword)}
//         sx={tempFormStyle}
//       >
//         <Typography>הזן סיסמה חדשה:</Typography>
//         <TextField
//           label="סיסמה חדשה"
//           type="password"
//           fullWidth
//           error={!!errorsNewPass.newPassword}
//           helperText={errorsNewPass.newPassword?.message}
//           {...registerNewPass("newPassword")}
//         />
//         <TextField
//           label="אישור סיסמה חדשה"
//           type="password"
//           fullWidth
//           error={!!errorsNewPass.confirmNewPassword}
//           helperText={errorsNewPass.confirmNewPassword?.message}
//           {...registerNewPass("confirmNewPassword")}
//         />
//         <Button type="submit" variant="contained" disabled={changeLoading}>
//           {changeLoading ? "מעדכן..." : "עדכן סיסמה"}
//         </Button>
//       </Box>
//     )}
//   </Paper>
//   );
// };

// export default SignIn;
