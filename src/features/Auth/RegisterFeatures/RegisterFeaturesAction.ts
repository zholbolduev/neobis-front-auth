import axios from "axios";
import { AppDispatch } from "../../../app/rootStore";
import { ITokens } from "../types";
import { registerSchema } from "./types";
import { setLoading, setData, setError } from "./RegisterFeaturesSlice";
import { sendConfirmationEmail } from "./email";
import { baseAPI } from "../../../shared/BaseAPI";

export const RegisterAction =
  (data: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      await registerSchema.validate(data);

      const response = await axios.post<ITokens>(
        `${baseAPI}/auth/sign-up`,
        data
      );
      console.log(response.data);

      sendConfirmationEmail(data.email, data.username);

      dispatch(setData(response.data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      dispatch(setError(error.message));
    }
  };
