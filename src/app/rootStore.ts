import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import loginReducer from "../features/Auth/LoginFeatures/LoginFeaturesSlice";
import registerReducer from "../features/Auth/RegisterFeatures/RegisterFeaturesSlice";
import forgotReducer from "../features/Auth/ForgotPassFeatures/ForgotPassFeaturesSlice";

const rootReducers = combineReducers({
  loginSlice: loginReducer,
  registerSlice: registerReducer,
  forgotPassword: forgotReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
  });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
