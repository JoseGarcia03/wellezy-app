import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/auth.slice";
import LayoutSlice from "./slices/layout.slice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        layout: LayoutSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
