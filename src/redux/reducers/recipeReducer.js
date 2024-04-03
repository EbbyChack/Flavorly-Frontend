import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  singleRecipe: {},
  userFavs: [],
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
    },
    
    setUserFavs(state, action) {
      state.userFavs = action.payload;
    }
  },
});

export const { setAllRecipes, setSingleRecipe, setUserFavs } = recipeSlice.actions;
export default recipeSlice.reducer;
