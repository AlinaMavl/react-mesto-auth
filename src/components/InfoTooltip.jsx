import React from "react";
import "../index.css";

function InfoTooltip({onClose, title, image, isOpen, name}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image" src={image}alt={title}/>
        <h2 className="popup__tooltip-title">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;