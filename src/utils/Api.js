
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        //если запрос не прошел то выкидываем ошибку
        //error уже встроен
        throw new Error("Что-то не так");
      })
  }

  getCardList() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  createCardApi(cardData) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    });
  }

  deleteCardApi(id) {
    return this._sendRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  patchUserInfo(data) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    });
  }

  patchAvatar(data) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    })
  }

  // putLike(id) {
  //   return this._sendRequest(`${this._url}/cards/${id}/likes`, {
  //     method: "PUT",
  //     headers: this._headers
  //   })
  // }

  // deleteLike(id) {
  //   return this._sendRequest(`${this._url}/cards/${id}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers
  //   })
  // }

  changeLikePostStatus(id, like) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: like ? 'PUT' : 'DELETE' ,
      headers: this._headers
      })
    }

}

// export default Api;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
  authorization: '9fc84d0c-b271-47fb-a61d-74255bd6a814',
    'Content-Type': "application/json"
  }
})

export default api

