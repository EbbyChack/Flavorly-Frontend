import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  singleRecipe: {},
 
};

const recipeSlice = createSlice({
  name: "recipeReducer",
  initialState,
  reducers: {
    setAllRecipes(state, action) {
      state.recipes = action.payload;
    },
    setSingleRecipe(state, action) {
      state.singleRecipe = action.payload;
     
    }
    
  },
});

export const { setAllRecipes, setSingleRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
