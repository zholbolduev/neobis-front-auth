import axios from "axios";
import { AppDispatch } from "../../../app/rootStore";
import { ITokens } from "../types";
import { registerSchema } from "./validation";
import { setLoading, setData, setError } from "./RegisterFeaturesSlice";
import { baseAPI } from "../../../shared/BaseAPI";

export const RegisterAction =
  (
    data: {
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    setIsRegisted: Function
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      await registerSchema.validate(data);

      const response = await axios.post<ITokens>(
        `${baseAPI}/api/v1/users/sign-up`,
        data
      );
      console.log(response.data);

      dispatch(setData(response.data));

      setIsRegisted(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      dispatch(setError(error.message));
    }
  };
