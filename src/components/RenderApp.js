import React, { useContext, useLayoutEffect } from 'react';
import AuthContext from '../context/AuthContext';
import Login from './Login';
import cookies from 'js-cookie';
import HomePage from './HomePage';
import AuthenticatedApp from './AuthenticatedApp';

const RenderApp = () => {
  const { user, setUser } = useContext(AuthContext);
  useLayoutEffect(() => {
    const cachedUser = cookies.get('user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
  }, [setUser]);

  return user?.username ? <AuthenticatedApp /> : <Login />;
};

export default RenderApp;
