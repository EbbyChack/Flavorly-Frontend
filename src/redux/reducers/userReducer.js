import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    };

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;