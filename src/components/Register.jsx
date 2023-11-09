import React from "react";
import SignWithForm from "./SignWithForm";

import "../index.css";

function Register({onSignSubmit}) {
  return (
    <SignWithForm
      name="register"
      title="Регистрация"
      isRegistered= "Уже зарегистрированы? Войти"
      button = "Зарегистрироваться"
      onSignSubmit={onSignSubmit}
      />
  );
}

export default Register;
