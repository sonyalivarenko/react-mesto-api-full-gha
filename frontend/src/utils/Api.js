import apiData from './utils'

class Api {
  constructor({baseUrl}) { 
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  _getToken() {
    return `Bearer ${localStorage.getItem("token")}`;
  }

  // загрузка информации о пользователе с сервера
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
    headers: {
      authorization: `${this._getToken()}`,
      'Content-Type': 'application/json',
    }})
      .then(res => {
        return this._getResponseData(res);
      });
  }

//загрузка информации о пользователе на сервер
  setProfileInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  // загрузка всех карточек с сервера
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: `${this._getToken()}`,
          'Content-Type': 'application/json',
        }})
        .then(res => {
          return this._getResponseData(res);
        });
  }

  // загрузка новых данных пользователя на сервер
  editProfile(profileInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profileInfo.name,
        about: profileInfo.job
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  // публикация новой карточки на сервер
  getNewCard(cardInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardInfo.title,
        link: cardInfo.link
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //удаление карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._getToken()}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  // отправка лайка на сервер
  _likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._getToken()}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }
 
  // удаление лайка с сервера
  _deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._getToken()}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  // загрузка нового аватара на сервер
  getNewAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

// изменение статуса "лайка" карточки
  changeLikeCardStatus(cardId, isNotLiked) {
    if (isNotLiked) {
      return this._likeCard(cardId);
    }
    else {
      return this._deleteLike(cardId);
    }
  }
  }

const apiExemplar = new Api(apiData);

export default apiExemplar;