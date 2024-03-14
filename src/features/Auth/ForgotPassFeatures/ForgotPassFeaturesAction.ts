/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "../../../app/rootStore";
import { setError, setLoading } from "./ForgotPassFeaturesSlice";
import axios from "axios";
import { baseAPI } from "../../../shared/BaseAPI";

export const ForgotAction =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      const response = await axios.post(
        `${baseAPI}/api/v1/users/request-password-reset?email=${email}`
      );
      console.log(response.data);
    } catch (error: any) {
      dispatch(setError(error.message || "Произошла ошибка при сбросе пароля"));
    }
  };
