/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .required("Поля обязательно к заполнению")
    .min(4, "минимум 4 символов"),
  password: yup
    .string()
    .required("Поля обязательно к заполнению")
    .min(6, "минимум 6 символов"),
});

//  ---------------------TYPES-----------------------

export interface ILogin {
  email: string;
  password: string;
}
