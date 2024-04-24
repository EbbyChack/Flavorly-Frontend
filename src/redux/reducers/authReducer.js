//importing createSlice function from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

//initial state of the authReducer
const initialState = {
    loggedProfile: null,
};


const authSlice = createSlice({
    name: "authReducer",
    initialState,

    reducers: {
        login(state, action) {
            state.loggedProfile = action.payload;
        },
        logout(state) {
            state.loggedProfile = null;
            localStorage.removeItem("loggedProfile");
            
        },
        
    },
});

//exporting the reducer and actions
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;   
