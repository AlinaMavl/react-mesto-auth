import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({name,link});

  }

  useEffect(()=>{
    setLink('');
    setName('');
  },[isOpen])

  return (
    <PopupWithForm
          name="picture"
          title="Новое место"
          button="Создать"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <div className="popup__form-container">
            <input
              className="popup__input popup__input_name"
              id="place-input"
              type="text"
              required=""
              name="name"
              value={name}
              onChange={handleName}
              placeholder="Название"
              minLength={2}
              maxLength={30}
            />
            <span className="popup__input-error place-input-error" />
          </div>
          <div className="popup__form-container">
            <input
              className="popup__input popup__input_link"
              id="link-input"
              type="url"
              required=""
              name="link"
              value={link}
              onChange={handleLink}
              placeholder="Ссылка на картинку"
            />
            <span className="popup__input-error link-input-error" />
          </div>
        </PopupWithForm>
  )

}

export default AddPlacePopup;