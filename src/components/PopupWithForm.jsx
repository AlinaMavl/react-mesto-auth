import React from "react";
import "../index.css";

function PopupWithForm({ name, title, button, children, isOpen, onClose, onSubmit }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <form className="popup__form" name={name} method="post" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          <div>{children}</div>
          <button className="popup__submit" type="submit">
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
