import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Введите корректный адрес почты")
    .required("Поле обязательно для заполнения email"),
  username: Yup.string().required("Поле обязательно для заполнения username"),
  password: Yup.string()
    .required("Поле обязательно для заполнения password")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(/[a-z]/, "Пароль должен содержать минимум одну строчную букву")
    .matches(/[A-Z]/, "Пароль должен содержать минимум одну прописную букву")
    .matches(/\d/, "Пароль должен содержать минимум одну цифру")
    .matches(/[!@#$%^&*]/, "Пароль должен содержать минимум один спецсимвол"),
  confirmPassword: Yup.string()
    .required("Поле обязательно для заполнения confirm-password")
    .oneOf([Yup.ref("password")], "Пароли должны совпадать"),
});

// --------------TYPES-------------

export interface IRegister {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
