import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LayoutSliceState {
    isLoading: boolean;
}

const initialState: LayoutSliceState = {
    isLoading: true,
};

export const LayoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = LayoutSlice.actions;
export default LayoutSlice.reducer;
