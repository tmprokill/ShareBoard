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
  const isAuthenticated = useSelector((state: AuthState) => state.isAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated == false) {
      toast.error(t("auth.errors.unauthorized"));
      store.dispatch(unauthorize());
      navigate("/login");
    }
  }, [isAuthenticated, navigate, t]);

  return (
    <div className="flex flex-col h-dvh">
      <Header />
        <div className="min-h-8/10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      <Footer />
    </div>
  );
}

export default App;
