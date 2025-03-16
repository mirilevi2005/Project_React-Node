import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const materialSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
    //   setRecipeList: (state, action) => {
    //         state.recipeList = action.payload;
    //     },
    //     setinsertRecipe: (state, action) => {
    //         state.recipeList.push(action.payload);
    //     },
    //     seteditRecipe: (state, action) => {
    //         const index = state.recipeList.findIndex(r => r.id === action.payload.id);
    //         if (index !== -1) {
    //             state.recipeList[index] = action.payload;
    //         }  
    //     },
    //     setremoveRecipe: (state, action) => {
    //         state.recipeList = state.recipeList.filter(recipe => recipe.id !== action.payload);
    //     },
    //     setSelectedRecipe: (state, action) => {
    //         state.selectedRecipe = action.payload;
    //     },
    //     setFormMode: (state, action) => {
    //         state.formMode = action.payload;
    //     },
    //     setError: (state, action) => {
    //         state.error = action.payload;
        
    //     },
    //     setIsLoading: (state, action) => {
    //       state.isLoading = action.payload;
    //     }
     }
});

export default materialSlice.reducer;
