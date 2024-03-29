import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratings: [],
  averageRating: {},
};

const ratingsSlice = createSlice({
  name: "ratingsReducer",
  initialState,
  reducers: {
    setRatings(state, action) {
      state.ratings = action.payload;
    },
    setAverageRating(state, action) {
      state.averageRating.averageRating = action.payload.averageRating / 2;
      state.averageRating.numberOfRatings = action.payload.numberOfRatings;
    },
  },
});

export const { setRatings, setAverageRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
