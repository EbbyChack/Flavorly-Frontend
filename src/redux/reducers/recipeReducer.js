import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipeReducer",
  initialState,
  reducers: {
    setAllRecipes(state, action) {
      state.recipes = action.payload;
    },
  },
});

export const { setAllRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
