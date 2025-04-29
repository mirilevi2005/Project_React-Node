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
  },
});
export const selectCurrentUser = (state: RootState) => state.userInfo.user;

export const { setUser, clearUser } = authStateSlice.actions;
export default authStateSlice.reducer;