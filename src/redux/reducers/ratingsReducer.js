import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  averageRating: {},
};

const ratingsSlice = createSlice({
  name: "ratingsReducer",
  initialState,
  reducers: {
    setAverageRating(state, action) {
      state.averageRating.averageRating = action.payload.averageRating / 2;
      state.averageRating.numberOfRatings = action.payload.numberOfRatings;
    },
  },
});

export const { setAverageRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
