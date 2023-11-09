import React from "react";
import SignWithForm from "./SignWithForm";
import "../index.css";

function Login({onSignSubmit}) {
  return (
    <SignWithForm
      name="login"
      title="Вход"
      button = "Войти"
      onSignSubmit={onSignSubmit}
      />
  );
}

export default Login;