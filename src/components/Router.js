import React from 'react';
import { useContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RenderApp from './RenderApp';
import AuthContext from '../context/AuthContext';

const Router = () => {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RenderApp />
    </AuthContext.Provider>
  );
};

export default Router;
