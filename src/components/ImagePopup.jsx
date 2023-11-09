import React from "react";
import "../index.css";

function ImagePopup({ card, onClose }) {

  if (!card.link) {
    return null; // Don't render the component if card.link is falsy
  }
  return (
    <div className={`${card?.link ? "popup popup_type_full_view popup_opened" : ""}`}>
      <div className="popup__container popup__container_view_full">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <img src={card?.link} alt={card?.name} className="popup__view-image" />
        <p className="popup__caption">{card?.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
