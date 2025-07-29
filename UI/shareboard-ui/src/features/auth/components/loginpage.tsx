import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { AuthState } from "../auth-slice";
import { useNavigate } from "react-router";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector(
    (state: AuthState) => state.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      //return to homepage if authenticated
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <input
        value={login}
        required
        onChange={(e) => setLogin(e.target.value)}
        type="text"
      />
      <input
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        type="text"
      />
      <h1>Welcome to the main page!</h1>
      <p>meow meow meow</p>
    </div>
  );
}

export default LoginPage;
