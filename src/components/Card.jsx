import React, { useContext} from "react";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  //Далее в разметке используем переменную для условного рендеринга
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = ()=> {
    onCardLike(card)
  }

  const handleDeleteClick = ()=>{
    onCardDelete(card._id);
  }

  return (
    <div className="element">
      {isOwn && (
        <button className="element__delete" onClick={handleDeleteClick}  />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__name">
        <h2 className="element__caption">{card.name}</h2>
        <div className="element__like-container">
          <button
          className={cardLikeButtonClassName}
          type="button" onClick={handleLikeClick}></button>
          <p className="element__like-counter">
            {card.likes ? card.likes.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
