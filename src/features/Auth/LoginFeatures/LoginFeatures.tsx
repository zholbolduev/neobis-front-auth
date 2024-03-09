import { Link } from "react-router-dom";
import background from "../../../shared/assets/Photo background.svg";
import "./LoginFeatures.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import eyeClosed from "../../../shared/assets/eyeClosed.svg";
import eyeOpened from "../../../shared/assets/eyeOpened.svg";
import { ILogin } from "./types";
import { schema } from "./types";
import { LoginAction } from "./LoginFeaturesAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/reduxHooks";
// import { toast } from "react-toastify";
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
  } = useForm<ILogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // toast.success("Успешно!", {
  //   position: toast.POSITION.TOP_RIGHT,
  //   autoClose: 2000,
  // });

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
        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}

        <label className="login__form__pass">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль (тоже введи)"
            {...register("password")}
          />

          <img
            onClick={() => setShowPassword(!showPassword)}
            src={showPassword ? eyeClosed : eyeOpened}
            alt=""
          />
        </label>

        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}

        <button className="login__form--btn" type="submit" disabled={!isValid}>
          Войти
        </button>
        <p>{error}</p>

        <Link className="link" to={"/register"}>
          У меня еще нет аккаунта
        </Link>
      </form>
    </div>
  );
};

export default LoginFeatures;
