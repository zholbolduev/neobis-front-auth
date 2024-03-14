import { Link } from "react-router-dom";
import background from "../../../shared/assets/Photo background.svg";
import "./LoginFeatures.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import eyeClosed from "../../../shared/assets/eyeClosed.svg";
import eyeOpened from "../../../shared/assets/eyeOpened.svg";
import { ILogin } from "./types";
import { schema } from "./validation";
import { LoginAction } from "./LoginFeaturesAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/reduxHooks";
import "react-toastify/dist/ReactToastify.css";

const LoginFeatures = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { error } = useAppSelector((state) => state.loginSlice);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<ILogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const watchAllFields = watch();

  return (
    <div className="login">
      <img className="login--background" src={background} alt="Background" />

      <form
        className="login__form"
        onSubmit={handleSubmit((data) => dispatch(LoginAction(data, reset)))}
      >
        <h1>Вэлком бэк!</h1>
        <input
          type="text"
          placeholder="Введи туда-сюда логин"
          {...register("email")}
        />
        {errors?.email && (
          <p style={{ color: "red" }}>{errors?.email?.message || "Error!"}</p>
        )}

        <label className="login__form__pass">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль (тоже введи)"
            {...register("password")}
          />

          <img
            onClick={() => setShowPassword(!showPassword)}
            src={showPassword ? eyeClosed : eyeOpened}
            alt="Eye"
          />
        </label>

        {errors?.password && (
          <p style={{ color: "red" }}>
            {errors?.password?.message || "Error!"}
          </p>
        )}

        <button
          className={
            !errors.email &&
            !errors.password &&
            watchAllFields.email &&
            watchAllFields.password
              ? "login__form--fullbtn"
              : "login__form--emptyBtn"
          }
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>

        <p style={{ color: "red" }}>{error}</p>

        <div>
          <Link className="forgotPassBtn" to={"/forgot-password"}>
            Забыл(а) пароль?
          </Link>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Link className="noAccountBtn" to={"/register"}>
            У меня еще нет аккаунта
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginFeatures;
