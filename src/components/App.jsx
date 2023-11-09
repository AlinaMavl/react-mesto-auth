import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";

import "../index.css";
import api from "../utils/Api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Card from "./Card";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

import fail from "../images/fail.png";
import success from "../images/success.png";

function App() {
  //POPUPS
  //open popups
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [isTooltipFailPopup, setIsTooltipFailPopup] = useState(false);
  const [isTooltipSuccessPopup, setIsTooltipSuccessPopup] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  //close popups
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsTooltipFailPopup(false);
    setIsTooltipSuccessPopup(false);
    setSelectedCard({ name: null, link: null });
  }
  //popup full view
  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  //AVATAR

  function handleUpdateAvatar(data) {
    api
      .patchAvatar({ link: data.avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  }

  //USER

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const handleUserRequest = () => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(console.error);
  };
  React.useEffect(() => {
    handleUserRequest();
  }, []);

  function handleUpdateUser(data) {
    api
      .patchUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  }

  //CARDS

  const [cards, setCards] = useState([]);

  const handleCardRequest = () => {
    api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch(console.error);
  };

  useEffect(() => {
    handleCardRequest();
  }, []);
  //LIKES
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikePostStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  //DELETE_BUTTON
  function handleDeleteClick(cardId) {
    api
      .deleteCardApi(cardId)
      .then(() => {
        const updateCards = cards.filter((card) => card._id !== cardId);
        setCards(updateCards);
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .createCardApi(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  //SIGN

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [email,setEmail] = useState('');

  //REGISTER

  const handleRegisterSubmit = (data) => {
    auth
      .register(data.email, data.password)
      .then((res) => {
        setIsTooltipSuccessPopup(true);
        navigate("/sign-in", { replace: true });

    })
      .catch((err)=>{
        console.log(err);
        setIsTooltipFailPopup(true);
      })
  };

  //LOGIN

  const handleLoginSubmit = (data) => {
    auth
      .authorize(data.email, data.password)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          setLoggedIn(true);
        }
        navigate("/", { replace: true });
        setEmail(data.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }

    //SIGNOUT
  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  };

  const handleTokenCheck = (jwt) => {
    if(jwt){
        auth
          .checkToken(jwt)
          .then((data) => {
            navigate("/", {replace: true});
            setLoggedIn(true);
            setEmail(data.data.email);
        });
      }}

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      handleTokenCheck(jwt);
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                email={email}
                headerSignOut={"Выйти"}
                onClick={signOut}
                path={'/sign-in'}
              />
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
                cards={cards}
              />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Header headerLink={"Вход"} path="/sign-in" />
              <Register onSignSubmit={handleRegisterSubmit} loggedIn={loggedIn} />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Header headerLink={"Регистрация"} path="/sign-up" />
              <Login
                onSignSubmit={handleLoginSubmit}
                loggedIn={loggedIn}
                />
            </>
          }
        />
      </Routes>
      <Footer />
      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isTooltipSuccessPopup}
        title={"Вы успешно зарегистрировались!"}
        image={success}
      />
      <InfoTooltip
        isOpen={isTooltipFailPopup}
        onClose={closeAllPopups}
        title={"Что-то пошло не так! Попробуйте ещё раз."}
        image={fail}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm name="confirmed" title="Вы уверены?" button="Да">
        {" "}
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onCardClick={handleCardClick}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
