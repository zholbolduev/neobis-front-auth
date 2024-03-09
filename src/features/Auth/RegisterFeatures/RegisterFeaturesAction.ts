import axios from "axios";
import { AppDispatch } from "../../../app/rootStore";
import { ITokens } from "../types";
import { registerSchema } from "./types";
import { setLoading, setData, setError } from "./RegisterFeaturesSlice";

export const RegisterAction =
  (data: {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      await registerSchema.validate(data);

      const response = await axios.post<ITokens>("", data);
      console.log(response.data);

      dispatch(setData(response.data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
