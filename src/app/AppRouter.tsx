import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ConfirmPage from "../pages/ConfirmPage/ConfirmPage";
import HomePage from "../pages/HomePage/HomePage";
import ForgotPassPage from "../pages/ForgotPassPage/ForgotPassPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const AppRouter = () => {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visited");
    if (visitedBefore === "true") {
      setVisited(true);
    } else {
      localStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={visited ? "/home" : "/login"} />}
        />
        <Route path="/login" element={<LoginPage />} />
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
