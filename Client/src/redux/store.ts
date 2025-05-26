import { configureStore } from "@reduxjs/toolkit";
import  apiSlice from "./slice/api/apiSlice";
import VideoReducer from "./slice/videoSlice";
import UserInfoReducer from "./slice/authStateSlice";
import TestReducer from "./slice/testSlice";
import userApi from "./slice/api/userApi";
import popupReducer from "./slice/popupslice"


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    videos: VideoReducer,
    userInfo: UserInfoReducer,
    tests: TestReducer,
    popup: popupReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;



