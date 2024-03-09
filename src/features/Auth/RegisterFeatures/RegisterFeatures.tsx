import { Link } from "react-router-dom";
import background from "../../../shared/assets/Photo background.svg";
import "./RegisterFeatures.scss";
import { useState } from "react";
import eyeClosed from "../../../shared/assets/eyeClosed.svg";
import eyeOpened from "../../../shared/assets/eyeOpened.svg";
import { IRegister, registerSchema } from "./types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/reduxHooks";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegisterAction } from "./RegisterFeaturesAction";

const RegisterFeatures = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { error } = useAppSelector((state) => state.loginSlice);

  const initialValues: IRegister = {
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: IRegister) => {
    console.log(values);

    dispatch(RegisterAction(values));
  };

  const validatePassword = (password: string) => {
    return {
      validLength: password.length >= 8 && password.length <= 15,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    };
  };

  const getPasswordValidationIcon = (isValid: boolean) => {
    return isValid ? "✅" : "❌";
  };

  return (
    <div className="register">
      <img className="register--background" src={background} alt="Background" />

      <Link className="link" to={"/"}>
        Назад
      </Link>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="register__form">
            <h1>Создать аккаунт Lorby</h1>

            <Field
              className="register__form--inputs"
              name="email"
              placeholder="Введи адрес почты"
            />
            <ErrorMessage name="email" component="p" />

            <Field
              name="userName"
              placeholder="Придумай логин"
              className="register__form--inputs"
            />
            <ErrorMessage name="userName" component="p" />

            <label className="register__form__pass">
              <Field
                className="register__form--inputs"
                name="password"
                placeholder="Создай пароль"
                type={showPassword ? "text" : "password"}
              />
              <ErrorMessage name="password" component="p" />

              <ul className="passwordIndicators">
                <li>
                  От 8 до 15 символов
                  {getPasswordValidationIcon(
                    validatePassword(values.password).validLength
                  )}
                </li>
                <li>
                  Строчные и прописные буквы
                  {getPasswordValidationIcon(
                    validatePassword(values.password).hasLowercase &&
                      validatePassword(values.password).hasUppercase
                  )}
                </li>
                <li>
                  Минимум 1 цифра
                  {getPasswordValidationIcon(
                    validatePassword(values.password).hasNumber
                  )}
                </li>
                <li>
                  Минимум 1 спецсимвол (!, ", #, $...)
                  {getPasswordValidationIcon(
                    validatePassword(values.password).hasSpecialChar
                  )}
                </li>
              </ul>

              <img
                onClick={() => setShowPassword(!showPassword)}
                src={showPassword ? eyeClosed : eyeOpened}
                alt="Eye"
              />
            </label>

            <label className="register__form__pass">
              <Field
                className="register__form--inputs"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Повтори пароль"
              />
              <ErrorMessage name="confirmPassword" component="p" />

              <img
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                src={showConfirmPassword ? eyeClosed : eyeOpened}
                alt="Eye"
              />
            </label>

            <button className="register__form--btn" type="submit">
              Submit
            </button>
            <p>{error}</p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterFeatures;
