import React, { useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const { login } = useContext(useAuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
}
