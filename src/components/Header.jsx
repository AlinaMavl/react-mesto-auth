import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../images/логотип.svg";

function Header({ email, headerLink, headerSignOut, path, onClick }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип. Место Россия" className="header__logo" />
      <div className="header__container">
        <p className="header__email">{email}</p>
        <Link
          to={path}
          onClick={onClick}
          className="header__link header__link_sign_out"
        >
          {headerSignOut}
        </Link>
        <p className="header__link">
          <Link to={path} className="header__link">
            {headerLink}
            </Link>
        </p>
      </div>

    </header>
  );
}

export default Header;
