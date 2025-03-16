
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from './slice/api/apiSlice';
import materialsApi from './slice/api/materialsApi';
import recipesReducer from "./slice/slice";
const store = configureStore({
    reducer: {
        [materialsApi.reducerPath]: apiSlice.reducer,
        recipes: recipesReducer
    },
    middleware: (getDefaultMiddlware) => {
        return getDefaultMiddlware().concat(apiSlice.middleware)
    }
})

export default store;