
// import type React from "react"

// import { useState } from "react"

// // MUI imports
// import { Box, Button, Divider, Paper, Tab, Tabs, TextField, Typography } from "@mui/material"
// import GoogleIcon from "@mui/icons-material/Google"
// import MailOutlineIcon from "@mui/icons-material/MailOutline"

// // Firebase imports (you'll need to install firebase)
// // npm install firebase
// import { initializeApp } from "firebase/app"
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth"

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider()

// const SignIn = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [magicLinkSent, setMagicLinkSent] = useState(false)
//   const [tabValue, setTabValue] = useState(0)
//   const [error, setError] = useState("")

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//     setError("")
//   }

//   const handlePasswordLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     try {
//       await signInWithEmailAndPassword(auth, email, password)
//       // Redirect or update UI on successful login
//       console.log("User logged in successfully")
//     } catch (error: any) {
//       setError(error.message || "Failed to login. Please check your credentials.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleMagicLinkLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     try {
//       await sendPasswordResetEmail(auth, email)
//       setMagicLinkSent(true)
//     } catch (error: any) {
//       setError(error.message || "Failed to send verification email.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handlePasswordReset = async (e: React.MouseEvent) => {
//     e.preventDefault()
//     setError("")

//     if (!email) {
//       setError("Please enter your email address first")
//       return
//     }

//     setIsLoading(true)
//     try {
//       await sendPasswordResetEmail(auth, email)
//       alert(`Password reset link sent to ${email}`)
//     } catch (error: any) {
//       setError(error.message || "Failed to send password reset email.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleGoogleLogin = async () => {
//     setIsLoading(true)
//     setError("")

//     try {
//       const result = await signInWithPopup(auth, googleProvider)
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result)
//       const token = credential?.accessToken
//       // The signed-in user info.
//       const user = result.user
//       console.log("Google user logged in:", user)
//       // Redirect or update UI on successful login
//     } catch (error: any) {
//       setError(error.message || "Failed to login with Google.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Paper elevation={3} sx={{ mt: 4, p: 3, maxWidth: 500, mx: "auto" }}>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs value={tabValue} onChange={handleTabChange} aria-label="login tabs" variant="fullWidth">
//           <Tab label="Password" id="login-tab-0" aria-controls="login-tabpanel-0" />
//           <Tab label="Email Verification" id="login-tab-1" aria-controls="login-tabpanel-1" />
//         </Tabs>
//       </Box>

//       {/* Error message display */}
//       {error && (
//         <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: "center" }}>
//           {error}
//         </Typography>
//       )}

//       {/* Password Login Tab */}
//       <Box role="tabpanel" hidden={tabValue !== 0} id="login-tabpanel-0" aria-labelledby="login-tab-0" sx={{ pt: 3 }}>
//         {tabValue === 0 && (
//           <Box
//             component="form"
//             onSubmit={handlePasswordLogin}
//             sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//           >
//             <TextField
//               label="Email address"
//               type="email"
//               fullWidth
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="your@email.com"
//             />

//             <Box sx={{ position: "relative" }}>
//               <TextField
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button
//                 onClick={handlePasswordReset}
//                 sx={{
//                   position: "absolute",
//                   right: 0,
//                   top: "-5px",
//                   fontSize: "0.75rem",
//                   textTransform: "none",
//                 }}
//               >
//                 Forgot your password?
//               </Button>
//             </Box>

//             <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 2 }}>
//               {isLoading ? "Signing in..." : "Sign in"}
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* Magic Link Login Tab */}
//       <Box role="tabpanel" hidden={tabValue !== 1} id="login-tabpanel-1" aria-labelledby="login-tab-1" sx={{ pt: 3 }}>
//         {tabValue === 1 && (
//           <>
//             {magicLinkSent ? (
//               <Box
//                 sx={{
//                   textAlign: "center",
//                   py: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   gap: 2,
//                 }}
//               >
//                 <MailOutlineIcon sx={{ fontSize: 48, color: "text.secondary" }} />
//                 <Typography variant="h6">Check your email</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   We've sent a verification code to <b>{email}</b>
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Don't see it? Check your spam folder or
//                   <Button
//                     onClick={() => setMagicLinkSent(false)}
//                     sx={{ ml: 0.5, textTransform: "none", p: 0, minWidth: "auto" }}
//                   >
//                     try again
//                   </Button>
//                 </Typography>
//               </Box>
//             ) : (
//               <Box
//                 component="form"
//                 onSubmit={handleMagicLinkLogin}
//                 sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//               >
//                 <TextField
//                   label="Email address"
//                   type="email"
//                   fullWidth
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                 />

//                 <Typography variant="body2" color="text.secondary">
//                   We'll send a verification code to your email that you can use to log in without a password.
//                 </Typography>

//                 <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 1 }}>
//                   {isLoading ? "Sending..." : "Send Verification Code"}
//                 </Button>
//               </Box>
//             )}
//           </>
//         )}
//       </Box>

//       {/* Google Login Section */}
//       <Box sx={{ mt: 3, position: "relative" }}>
//         <Divider>
//           <Typography variant="caption" sx={{ px: 1, color: "text.secondary" }}>
//             Or continue with
//           </Typography>
//         </Divider>

//         <Button
//           variant="outlined"
//           fullWidth
//           startIcon={<GoogleIcon />}
//           onClick={handleGoogleLogin}
//           disabled={isLoading}
//           sx={{ mt: 2 }}
//         >
//           Sign in with Google
//         </Button>
//       </Box>
//     </Paper>
//   )
// }




// export default SignIn



















import type React from "react"

import { useState } from "react"

// MUI imports
import { Box, Button, Divider, Paper, Tab, Tabs, TextField, Typography } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import MailOutlineIcon from "@mui/icons-material/MailOutline"

const SignIn=()=> {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Here you would implement your authentication logic
    // For example: await signIn('credentials', { email, password })

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Here you would implement your magic link logic
    // For example: await sendMagicLink(email)

    setTimeout(() => {
      setIsLoading(false)
      setMagicLinkSent(true)
    }, 1000)
  }

  
  
  return (
    <Paper elevation={3} sx={{ mt: 4, p: 3, maxWidth: 500, mx: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="login tabs" variant="fullWidth">
          <Tab label="Password" id="login-tab-0" aria-controls="login-tabpanel-0" />
          <Tab label="Email Verification" id="login-tab-1" aria-controls="login-tabpanel-1" />
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 0} id="login-tabpanel-0" aria-labelledby="login-tab-0" sx={{ pt: 3 }}>
        {tabValue === 0 && (
          <Box
            component="form"
            onSubmit={handlePasswordLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />

            <Box sx={{ position: "relative" }}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          
            </Box>

            <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 2 }}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
        )}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 1} id="login-tabpanel-1" aria-labelledby="login-tab-1" sx={{ pt: 3 }}>
        {tabValue === 1 && (
          <>
            {magicLinkSent ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <MailOutlineIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                <Typography variant="h6">Check your email</Typography>
                <Typography variant="body2" color="text.secondary">
                  We've sent a verification code to <b>{email}</b>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Don't see it? Check your spam folder or
                  <Button
                    onClick={() => setMagicLinkSent(false)}
                    sx={{ ml: 0.5, textTransform: "none", p: 0, minWidth: "auto" }}
                  >
                    try again
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />

                <Typography variant="body2" color="text.secondary">
                  We'll send a verification code to your email that you can use to log in without a password.
                </Typography>

                <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 1 }}>
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

      <Box sx={{ mt: 3, position: "relative" }}>
        <Divider>
          <Typography variant="caption" sx={{ px: 1, color: "text.secondary" }}>
            Or continue with
          </Typography>
        </Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={() => alert("Google login would be implemented here")}
          sx={{ mt: 2 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Paper>
  )
}
export default SignIn
