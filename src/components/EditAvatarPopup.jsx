import React,{useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatar = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  useEffect(()=>{
    avatar.current.value = "";
  },[isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-container popup__form-container_type_avatar">
        <input
          className="popup__input popup__input_link"
          id="avatar"
          type="url"
          required=""
          name="link"
          placeholder="Ссылка на аватар"
          ref={avatar}
        />
        <span className="popup__input-error avatar-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
