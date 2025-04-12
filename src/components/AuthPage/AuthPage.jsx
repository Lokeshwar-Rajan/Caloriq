// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import SignUp from '../auth/SignUp';
import Login from '../auth/Login';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <SignUp onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthPage;
