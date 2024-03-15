import { Link } from "react-router-dom";
import background from "../../../shared/assets/Photo background.svg";
import leftArrow from "../../../shared/assets/Left-arrow.svg";
import "./ForgotPassFeatures.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/reduxHooks";
import { ChangeEvent, FormEvent, useState } from "react";
import { ForgotAction } from "./ForgotPassFeaturesAction";

const ForgotPassFeatures = () => {
  const [email, setEmail] = useState<string>("");

  const dispatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.forgotPassword);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(ForgotAction(email));
  };

  return (
    <div className="forgotPassword">
      <img
        className="forgotPassword--background"
        src={background}
        alt="Background"
      />

      <Link className="link" to={"/"}>
        <img className="link__img" src={leftArrow} alt="Left Arrow" />
        Назад
      </Link>

      <div className="forgotPassword__inputBlock">
        <h1>Сбросс пароля</h1>
        <form
          className="forgotPassword__inputBlock__form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Введите email"
          />

          <br />

          <button
            type="submit"
            disabled={loading}
            className={email ? "fullBtn" : "emptyBtn"}
          >
            {loading ? "Отправить..." : "Отправить"}
          </button>
          {error && <p style={{ color: "red", display: "none" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassFeatures;
