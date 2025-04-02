

import { configureStore } from "@reduxjs/toolkit";
import  apiSlice from "./slice/api/apiSlice";
import materialsApi from "./slice/api/materialsApi";
import recipesReducer from "./slice/slice";

const store = configureStore({
    reducer: {
        [materialsApi.reducerPath]: apiSlice.reducer,
        videos: recipesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

