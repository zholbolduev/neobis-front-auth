import { Link } from "react-router-dom";
import background from "../../../shared/assets/Photo background.svg";
import "./RegisterFeatures.scss";
import { useState } from "react";
import eyeClosed from "../../../shared/assets/eyeClosed.svg";
import eyeOpened from "../../../shared/assets/eyeOpened.svg";
import { IRegister } from "./types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/reduxHooks";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegisterAction } from "./RegisterFeaturesAction";
import leftArrow from "../../../shared/assets/Left-arrow.svg";
import { registerSchema } from "./validation";

const RegisterFeatures = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { error } = useAppSelector((state) => state.registerSlice);

  const initialValues: IRegister = {
    email: "",
    username: "",
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
    return isValid ? " ✅" : " ❌";
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    const form = event.currentTarget.form as HTMLFormElement;
    const formData = new FormData(form);
    const values: IRegister = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    handleSubmit(values);
  };

  return (
    <div className="register">
      <img className="register--background" src={background} alt="Background" />

      <Link className="link" to={"/login"}>
        <img className="link__img" src={leftArrow} alt="Left Arrow" />
        Назад
      </Link>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="register__form">
            <h1>Создать аккаунт Lorby</h1>

            <Field
              className="register__form--inputs"
              name="email"
              placeholder="Введи адрес почты"
            />
            <ErrorMessage name="email" component="p" className="errorMessage" />

            <Field
              name="username"
              placeholder="Придумай логин"
              className="register__form--inputs"
            />
            <ErrorMessage
              name="username"
              component="p"
              className="errorMessage"
            />

            <label className="register__form__pass">
              <Field
                className="register__form--inputs"
                name="password"
                placeholder="Создай пароль"
                type={showPassword ? "text" : "password"}
              />

              <ErrorMessage
                name="password"
                component="p"
                className="errorMessage"
              />

              <img
                className="createPass"
                onClick={() => setShowPassword(!showPassword)}
                src={showPassword ? eyeClosed : eyeOpened}
                alt="Eye"
              />

              <ul className="passwordIndicators">
                <li
                  className={
                    validatePassword(values.password).validLength
                      ? "passwordIndicators--successText"
                      : "passwordIndicators--errorText"
                  }
                >
                  От 8 до 15 символов
                  {getPasswordValidationIcon(
                    validatePassword(values.password).validLength
                  )}
                </li>
                <li
                  className={
                    validatePassword(values.password).hasLowercase &&
                    validatePassword(values.password).hasUppercase
                      ? "passwordIndicators--successText"
                      : "passwordIndicators--errorText"
                  }
                >
                  Строчные и прописные буквы
                  {getPasswordValidationIcon(
                    validatePassword(values.password).hasLowercase &&
                      validatePassword(values.password).hasUppercase
                  )}
                </li>
                <li
                  className={
                    validatePassword(values.password).hasNumber
                      ? "passwordIndicators--successText"
                      : "passwordIndicators--errorText"
                  }
                >
                  Минимум 1 цифра
                  {getPasswordValidationIcon(
                    validatePassword(values.password).hasNumber
                  )}
                </li>
                <li
                  className={
                    validatePassword(values.password).hasSpecialChar
                      ? "passwordIndicators--successText"
                      : "passwordIndicators--errorText"
                  }
                >
                  Минимум 1 спецсимвол (!, ", #, $...)
                  {getPasswordValidationIcon(
                    validatePassword(values.password).hasSpecialChar
                  )}
                </li>
              </ul>
            </label>

            <label className="register__form__pass">
              <Field
                className="register__form--inputs"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Повтори пароль"
              />

              <img
                className="confirmPass"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                src={showConfirmPassword ? eyeClosed : eyeOpened}
                alt="Eye"
              />
            </label>
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="errorMessage"
            />

            <button
              className={
                values.email &&
                values.username &&
                values.password &&
                values.confirmPassword
                  ? "register__form--fullBtn"
                  : "register__form--emptyBtn"
              }
              type="submit"
              disabled={isSubmitting}
              onClick={handleButtonClick}
            >
              Зарегистрироваться
            </button>

            <p style={{ color: "red" }}>{error}</p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterFeatures;
