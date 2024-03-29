import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientsAndCategories: [],
};

const ingAndCatSlice = createSlice({
  name: "ingAndCatReducer",
  initialState,
  reducers: {
    setIngredientsAndCategories(state, action) {
      state.ingredientsAndCategories = action.payload;
    },
  },
});

export const { setIngredientsAndCategories } = ingAndCatSlice.actions;
export default ingAndCatSlice.reducer;
