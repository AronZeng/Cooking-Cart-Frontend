import axios from 'axios';
import jwt from 'jsonwebtoken';

const login = function (username, password) {
  return new Promise(function (resolve, reject) {
    axios
      .post(
        'http://localhost:4000/auth/login',
        {
          username: username,
          password: password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      // fetch('http://localhost:4000/auth/login', { mode: 'cors' })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

const logout = function (token) {
  return new Promise(function (resolve, reject) {
    axios
      .post(
        'http://localhost:4000/auth/logout',
        {},
        {
          headers: { 'content-Type': 'application/json', authorization: token },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUser = function (token) {
  console.log(token);
  return new Promise(function (resolve, reject) {
    const userId = jwt.decode(token).userId;
    console.log('userID: ', userId);
    axios
      .get(`http://localhost:4000/users/${userId}`, {
        headers: {
          'content-Type': 'application/json',
          authorization: token,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { login, logout, getUser };
