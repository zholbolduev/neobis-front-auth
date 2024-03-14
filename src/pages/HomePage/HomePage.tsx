import ReactModal from "react-modal";
import homeBackground from "../../shared/assets/HomeBack.png";
import "./HomePage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="homePage">
      <h1>Добро пожаловать!</h1>
      <span>Lorby - твой личный репетитор</span>
      <img src={homeBackground} alt="Background" />

      <button onClick={openModal}>Выйти</button>

      {/* ------------------Modal Start------------ */}

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h3>Выйти?</h3>

        <span>Точно выйти?</span>

        <Link to={"/"}>
          <button className="btn" onClick={closeModal}>
            Да, точно
          </button>
        </Link>

        <button className="btn" onClick={closeModal}>
          Нет, остаться
        </button>
      </ReactModal>
    </div>
  );
};

export default HomePage;
