import { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AuthState, unauthorize } from "./features/auth/auth-slice";
import HomePage from "./features/home/components/homepage";
import { store } from "./common/app/redux/store";
import LoginPage from "./features/auth/components/loginpage";
import { useTranslation } from "react-i18next";
import { Header } from "./features/layout/header/header";
import { Footer } from "./features/layout/footer/footer";
import RegisterPage from "./features/auth/components/registerpage";

function App() {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const isTokenValid = useSelector((state: AuthState) => state.isTokenValid);

  useEffect(() => {
    if (isTokenValid == false) {
      toast.error(t("auth.errors.unauthorized"));
      store.dispatch(unauthorize());
      navigate("/login");
    }
  }, [isTokenValid, navigate, t]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
