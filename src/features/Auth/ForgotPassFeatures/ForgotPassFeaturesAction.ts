/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from "../../../app/rootStore";
import { setError, setLoading } from "./ForgotPassFeaturesSlice";
import axios from "axios";
import { baseAPI } from "../../../shared/BaseAPI";

export const ForgotAction =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    try {
      const accessToken = localStorage.getItem("user");

      if (!accessToken) {
        throw new Error("Токен доступа не найден в localStorage");
      }

      const response = await axios.post(
        `${baseAPI}/api/v1/users/request-password-reset?email=${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    } catch (error: any) {
      dispatch(setError(error.message || "Произошла ошибка при сбросе пароля"));
    }
  };
