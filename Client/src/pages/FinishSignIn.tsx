import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, signInWithEmailLink } from "../firebase"

const FinishSignIn = () => {
  const [message, setMessage] = useState("Completing sign-in...")
  const navigate = useNavigate()

  useEffect(() => {
    const completeSignIn = async () => {
      const email = window.localStorage.getItem("emailForSignIn")
      if (!email) {
        setMessage("No email found. Please try signing in again.")
        return
      }

      if (auth.isSignInWithEmailLink(window.location.href)) {
        try {
          const result = await signInWithEmailLink(auth, email, window.location.href)
          console.log("Signed in user:", result.user)
          window.localStorage.removeItem("emailForSignIn")
          setMessage("Sign-in successful! Redirecting...")
          setTimeout(() => navigate("/"), 2000)
        } catch (error) {
          console.error("Error completing sign-in", error)
          setMessage("Error completing sign-in. Try again.")
        }
      } else {
        setMessage("Invalid sign-in link.")
      }
    }

    completeSignIn()
  }, [navigate])

  return <div style={{ textAlign: "center", marginTop: "3rem" }}>{message}</div>
}

export default FinishSignIn
