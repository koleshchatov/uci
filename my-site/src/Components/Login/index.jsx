import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext/AuthContext";
import Loader from "../Loader";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { isLoadingAuth, login, isError } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: userName, password: userPassword });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="form"
        style={{
          alignItems: "center",
          marginTop: 400,
          width: 1000,
          height: 1000,
        }}
      >
        {isError && (
          <div style={{ paddingBottom: 20, color: "red" }}>{isError}</div>
        )}
        Name:
        <input
          style={{ width: 500, height: 30 }}
          type="text"
          id="name"
          name="name"
          placeholder="Имя пользователя"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br></br>
        Password:
        <input
          style={{
            width: 500,
            height: 30,
            marginTop: 30,
            marginRight: 24,
          }}
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br></br>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 440,
            textAlign: "center",
          }}
        >
          <button type="submit" onClick={handleSubmit} style={{ margin: 20 }}>
            Войти
          </button>
          {isLoadingAuth && (
            <div>
              <Loader />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
