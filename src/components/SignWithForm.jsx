import React,{useState} from "react";
import {Link} from 'react-router-dom';
import "../index.css";

function SignWithForm({name,title,isRegistered, button, onSubmit, onChange,onSignSubmit }) {
    const [email, setEmail]= useState('');
  const [password, setPassword]=useState('');

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

  function handleSignSubmit(e) {
    e.preventDefault();
    onSignSubmit({
      email, password
    });
  }

  return (
      <div className="sign__container">
        <form
          className="popup__form"
          method="post"
          onSubmit={handleSignSubmit}
          name={name}
        >
          <h2 className="sign__title">{title}</h2>
          <div className="sign__form-container">
            <input
              className="sign__input"
              id="email-input"
              type="text"
              required=""
              name="email"
              placeholder="Email"
              minLength={8}
              maxLength={40}
              value={email}
              onChange={handleEmailChange}
            />
            <span className="sign__input-error name-input-error" />
          </div>
          <div className="sign__form-container">
            <input
              className="sign__input"
              id="password"
              type="text"
              required=""
              name="password"
              placeholder="Пароль"
              minLength={6}
              maxLength={10}
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="sign__input-error" />
          </div>
          <div className="sign__form-container">
            <button className="sign__submit" type="submit">
              {button}
            </button>
            <span className="sign__link"><Link to="/sign-in" className="sign__link">{isRegistered}</Link></span>
          </div>
        </form>
      </div>
  );
}

export default SignWithForm;
