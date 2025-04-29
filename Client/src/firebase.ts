// // firebase.ts
// import { initializeApp } from "firebase/app"
// import { getAuth, GoogleAuthProvider } from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyB9PhX7-zZPD9l5edl4F-kUVB0KQdwr1gw",
//   authDomain: "reactnode-ad0a3.firebaseapp.com",
//   projectId: "reactnode-ad0a3",
//   storageBucket: "reactnode-ad0a3.firebasestorage.app",
//   messagingSenderId: "603413635212",
//   appId: "1:603413635212:web:c242e3743db671bcd3dba9",
//   measurementId: "G-ESB74VC2RP",
  
// }

// const app = initializeApp(firebaseConfig)

// // Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional



// const auth = getAuth(app)
// const provider = new GoogleAuthProvider()

// export { auth, provider }










import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithEmailLink } from "firebase/auth" // הוסף את signInWithEmailLink כאן

const firebaseConfig = {
  apiKey: "AIzaSyB9PhX7-zZPD9l5edl4F-kUVB0KQdwr1gw",
  authDomain: "reactnode-ad0a3.firebaseapp.com",
  projectId: "reactnode-ad0a3",
  storageBucket: "reactnode-ad0a3.firebasestorage.app",
  messagingSenderId: "603413635212",
  appId: "1:603413635212:web:c242e3743db671bcd3dba9",
  measurementId: "G-ESB74VC2RP",
}

const app = initializeApp(firebaseConfig)

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider, signInWithEmailLink } // הוסף את signInWithEmailLink כאן

