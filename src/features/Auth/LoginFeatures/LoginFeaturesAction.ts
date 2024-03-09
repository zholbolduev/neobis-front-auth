import axios from "axios";
import { schema } from "./types";
import { AppDispatch } from "../../../app/rootStore";
import { loginFeaturesSlice } from "./LoginFeaturesSlice";
import { ITokens } from "../types";

export const LoginAction =
  (
    data: { email: string; password: string },
    // eslint-disable-next-line @typescript-eslint/ban-types
    reset: Function
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(loginFeaturesSlice.actions.setLoading());

    try {
      await schema.validate(data);

      const response = await axios.post<ITokens>("", data);
      console.log(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch(loginFeaturesSlice.actions.setData(response.data));

      //   eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(loginFeaturesSlice.actions.setError(error.message));

      console.error(error);
    }

    reset();
  };