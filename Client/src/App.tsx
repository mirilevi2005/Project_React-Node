// import './App.css';
// import { useEffect } from 'react';
// import { RouterProvider } from 'react-router';
// import router from '../src/routes/appRouter';
// import { Provider, useDispatch } from 'react-redux';
// import store from '../src/redux/store';
// import { getCookie } from 'typescript-cookie';
// import { setUser } from '../src/redux/slice/authStateSlice';
// import { jwtDecode } from 'jwt-decode';
// import { userInfo } from '../src/interface/authTypes';
// import { CookiesProvider } from 'react-cookie'; // 👈 הוספה חשובה

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = getCookie('token');
//     if (token) {
//       try {
//         const decoded: userInfo = jwtDecode(token);
//         dispatch(setUser(decoded));
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//       }
//     }
//   }, [dispatch]);

//   return (
//     <RouterProvider router={router} />
//   );
// }

// export default function AppWithProvider() {
//   return (
//     <Provider store={store}>
//       <CookiesProvider> {/* 👈 עטיפה ב-CookiesProvider */}
//         <App />
//       </CookiesProvider>
//     </Provider>
//   );
// }










import './App.css';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import router from '../src/routes/appRouter';
import { Provider, useDispatch } from 'react-redux';
import store from '../src/redux/store';
import { getCookie } from 'typescript-cookie';
import { setUser } from '../src/redux/slice/authStateSlice';
import { jwtDecode } from 'jwt-decode';
import { userInfo } from '../src/interface/authTypes';
import { CookiesProvider } from 'react-cookie';

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = getCookie('token');
    
  //   // הדפסת הטוקן לצורך בדיקה
  //   console.log("Token from cookie:", token);

  //   if (token) {
  //     try {
  //       // אם הטוקן לא בתצורה תקינה (שלושה חלקים)
  //       if (token.split('.').length !== 3) {
  //         throw new Error('Invalid token format');
  //       }

  //       const decoded: userInfo = jwtDecode(token);
  //       dispatch(setUser(decoded));
  //     } catch (error) {
  //       console.error("Failed to decode token:", error);
  //     }
  //   }
  // }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
}

export default function AppWithProvider() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  );
}
