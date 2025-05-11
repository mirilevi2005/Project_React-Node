import { configureStore } from "@reduxjs/toolkit";
import  apiSlice from "./slice/api/apiSlice";
import VideoReducer from "./slice/videoSlice";
import UserInfoReducer from "./slice/authStateSlice";
import TestReducer from "./slice/testSlice"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        videos: VideoReducer,
        userInfo:UserInfoReducer,
        tests: TestReducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
