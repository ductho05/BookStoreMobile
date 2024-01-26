import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null,
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        login: (state, action) => {

            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.data;
        },

        logout: (state) => {

            state.isLoggedIn = false;
            state.token = null;
            state.user = null
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
