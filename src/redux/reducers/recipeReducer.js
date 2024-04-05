import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  singleRecipe: {},
  userFavs: [],
  topRecipes: [],
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
    clearSingleRecipe(state) {
      state.singleRecipe = {};
    },
    setUserFavs(state, action) {
      state.userFavs = action.payload;
    },
    setTopRecipes(state, action) {
      state.topRecipes = action.payload;
    }
  },
});

export const { setAllRecipes, setSingleRecipe, setUserFavs, clearSingleRecipe, setTopRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
