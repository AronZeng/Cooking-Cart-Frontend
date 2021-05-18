import axios from 'axios';

const getRecipes = function (token, page, limit = 10, user = null) {
  let params = { page: page, limit: limit };
  if (user) params.user = user;
  return new Promise(function (resolve, reject) {
    axios
      .get('http://localhost:4000/recipes', {
        headers: { 'Content-Type': 'application/json', authorization: token },
        params: params,
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

export { getRecipes };
