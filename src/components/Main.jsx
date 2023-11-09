import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-button" type="button">
          <img
            className="profile__avatar"
            onClick={onEditAvatar}
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </button>
        <div className="profile__info">
          <div className="profile__full-name">
            <div className="profile__edit-name">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
              {...card}
              card={card}
            />
          )
        })}
      </section>
    </main>
  );
}

export default Main;