/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .required("Поля обязательно к заполнению")
    .min(4, "минимум 4 символов"),
  password: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(/[a-z]/, "Пароль должен содержать минимум одну строчную букву")
    .matches(/[A-Z]/, "Пароль должен содержать минимум одну прописную букву")
    .matches(/\d/, "Пароль должен содержать минимум одну цифру")
    .matches(/[!@#$%^&*]/, "Пароль должен содержать минимум один спецсимвол"),
});
