import { configureStore } from "@reduxjs/toolkit";
import  apiSlice from "./slice/api/apiSlice";
import materialsApi from "./slice/api/materialsApi";
import VideoReducer from "../redux/slice/videoSlice";
import UserInfoReducer from "../redux/slice/authStateSlice";
import testApi from "./slice/api/testApi";

const store = configureStore({
    reducer: {
        [materialsApi.reducerPath]: apiSlice.reducer,
        [testApi.reducerPath]:apiSlice.reducer,
        videos: VideoReducer,
        userInfo:UserInfoReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

