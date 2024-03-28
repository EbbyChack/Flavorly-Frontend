//importing createSlice function from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

//initial state of the authReducer
const initialState = {
    loggedProfile: null,
};

//authSlice is created using createSlice function
const authSlice = createSlice({
    name: "authReducer",
    initialState,
    //reducers are functions that take the current state and an action, and return a new state
    reducers: {
        login(state, action) {
            state.loggedProfile = action.payload;
        },
        logout(state) {
            state.loggedProfile = null;
        },
        
    },
});

//exporting the reducer and actions
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;   
