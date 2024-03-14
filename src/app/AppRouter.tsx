import { Route, Routes } from "react-router";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ConfirmPage from "../pages/ConfirmPage/ConfirmPage";
import HomePage from "../pages/HomePage/HomePage";
import ForgotPassPage from "../pages/ForgotPassPage/ForgotPassPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
