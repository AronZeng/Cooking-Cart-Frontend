import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { logout } from '../api/auth';
import cookies from 'js-cookie';

const HomePage = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user.username);
  return (
    <>
      <p>{user.username}</p>
      <button
        onClick={() => {
          console.log('logging out...');
          logout(user.token).then((res) => {
            cookies.remove('user');
            setUser({});
          });
        }}
      >
        Logout
      </button>
    </>
  );
};

export default HomePage;
