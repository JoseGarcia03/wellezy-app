import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string;
    name: string;
    last_name: string;
    email: string;
}

export interface AuthSliceState {
    isAuth: boolean;
    token: string | null;
    user: User | null;
}

const initialState: AuthSliceState = {
    isAuth: false,
    token: null,
    user: null,
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        logout: (state) => {
            localStorage.removeItem("token");
            state.isAuth = false;
            state.token = null;
            state.user = null;
        },
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
