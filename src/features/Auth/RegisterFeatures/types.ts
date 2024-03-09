import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Имя пользователя обязательно")
    .min(3, "Минимальная длина имени пользователя - 3 символа"),
  email: yup
    .string()
    .email("Некорректный адрес электронной почты")
    .required("Email обязателен"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(8, "Минимальная длина пароля - 8 символов")
    .max(15, "Максимальная длина пароля - 15 символов")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Пароль должен содержать минимум одну строчную букву, одну заглавную букву, одну цифру и один специальный символ"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
});

// --------------TYPES-------------

export interface IRegister {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}
