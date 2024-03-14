import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetch } from "../../../shared/types";

const initialState: IFetch = {
  loading: false,
  error: "",
};

export const ForgotPassFeaturesSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setError, setLoading } = ForgotPassFeaturesSlice.actions;

export default ForgotPassFeaturesSlice.reducer;
