import axios from 'axios';
import jwt from 'jsonwebtoken';

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

const updateUser = function (token, newUser) {
  console.log(token);
  console.log(newUser);
  return new Promise(function (resolve, reject) {
    const userId = jwt.decode(token).userId;
    axios
      .put(`http://localhost:4000/users/${userId}`, newUser, {
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

export { getUser, updateUser };
