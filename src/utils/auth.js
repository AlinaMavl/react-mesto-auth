export const BASE_URL = 'https://auth.nomoreparties.co';

const handleResponse = (res)=>{
  if (res.ok){
    return res.json();
  } else {
    return Promise.reject(`Что-то не так:${res.status}`)
  }
}

export const register = ( email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(handleResponse)
};

export const authorize = ( email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(handleResponse)
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
};

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${jwt}`,
    }
  })
  .then(handleResponse)
  .then(data => data)
};