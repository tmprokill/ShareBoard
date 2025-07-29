import { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AuthState, unauthorize } from "./features/auth/auth-slice";
import HomePage from "./features/home/components/homepage";
import { store } from "./common/app/store";
import LoginPage from "./features/auth/components/loginpage";

function App() {
  const navigate = useNavigate();

  const isTokenValid = useSelector((state: AuthState) => state.isTokenValid);

  useEffect(() => {
    if (isTokenValid == false) {
      toast.error("Please, log in into the system");
      store.dispatch(unauthorize());
      navigate("/login");
    }
  }, [isTokenValid, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
