import { Link } from "react-router-dom";
import leftArrow from "../../../shared/assets/Left-arrow.svg";
import background from "../../../shared/assets/Photo background.svg";
import "./ConfirmEmailFeatures.scss";

const ConfirmEmailFeatures = () => {
  return (
    <div className="confirm">
      <img className="confirm--background" src={background} alt="Background" />

      <Link className="link" to={"/register"}>
        <img className="link__img" src={leftArrow} alt="Left Arrow" />
        Назад
      </Link>

      <div className="confirm__textBlock">
        <span>
          Выслали письмо со ссылкой для
          <br />
          <span style={{ marginLeft: "17px" }}>завершения регистрации на</span>
          <br />
          <span style={{ marginLeft: "55px" }}>example@gmail.com</span>
        </span>

        <p>
          Если письмо не пришло, не спеши ждать совиную почту - лучше{" "}
          <span style={{ fontWeight: "700" }}>проверь ящик “Спам”</span>
        </p>

        <span className="emoji">(´｡• ω •｡`)</span>

        <Link to={"/"} className="link">
          Далее
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmailFeatures;
