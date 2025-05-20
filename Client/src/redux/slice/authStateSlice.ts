// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { userInfo } from '../../interface/authTypes'; 
// import { RootState } from '../../redux/store'; 
// interface AuthState {
//   user: userInfo | null;
// }

// const initialState: AuthState = {
//   user: null,
// };

// const authStateSlice = createSlice({
//   name: 'authState',
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<userInfo>) {
//       state.user = action.payload;
//     },
//     clearUser(state) {
//       state.user = null;
//     },
//   },
// });
// export const selectCurrentUser = (state: RootState) => state.userInfo.user;

// export const { setUser, clearUser } = authStateSlice.actions;
// export default authStateSlice.reducer;




// // authStateSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { userInfo } from '../../interface/authTypes'; 
// import { RootState } from '../../redux/store'; 

// interface AuthState {
//   user: userInfo | null;
// }

// const initialState: AuthState = {
//   user: null,
// };

// const authStateSlice = createSlice({
//   name: 'authState',
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<userInfo>) {
//       state.user = action.payload;
//     },
//     clearUser(state) {
//       state.user = null;
//     },
//     // פונקציית התנתקות שמסירה את המשתמש מה-store ומוחקת את ה-cookies
//     logout(state) {
//       // מחיקת ה-cookies המקושרים להתחברות
//       document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
//       // ניקוי נתוני המשתמש מה-state
//       state.user = null;
//     },
//   },
// });

// export const selectCurrentUser = (state: RootState) => state.userInfo.user;

// export const { setUser, clearUser, logout } = authStateSlice.actions;
// export default authStateSlice.reducer;




// authStateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userInfo } from '../../interface/authTypes'; 
import { RootState } from '../../redux/store'; 

interface AuthState {
  user: userInfo | null;
}

const initialState: AuthState = {
  user: null,
};

const authStateSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userInfo>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    // Logout function - clears user from store and deletes cookies
    logout(state) {
      // Clear all auth-related cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "roles=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Clear user state
      state.user = null;
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.userInfo.user;

export const { setUser, clearUser, logout } = authStateSlice.actions;
export default authStateSlice.reducer;