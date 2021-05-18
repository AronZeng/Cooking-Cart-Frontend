import axios from 'axios';

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

export { login, logout };
