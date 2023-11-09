import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-container">
        <input
          className="popup__input popup__input_name_typed"
          id="name-input"
          type="text"
          required=""
          name="name"
          value={name}
          onChange={handleName}
          placeholder="Имя"
          minLength={2}
          maxLength={40}
        />
        <span className="popup__input-error name-input-error" />
      </div>
      <div className="popup__form-container">
        <input
          className="popup__input popup__input_description_typed"
          id="description"
          type="text"
          required=""
          name="about"
          value={description}
          onChange={handleDescription}
          placeholder="О себе"
          minLength={2}
          maxLength={200}
        />
        <span className="popup__input-error description-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
