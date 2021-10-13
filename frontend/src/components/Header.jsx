/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { signOut, googleAuth } from '../redux/actions/postsActionGenerators';

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData);

  useEffect(() => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id:
          process.env.REACT_APP_GOOGLE_CLIENT_ID,
        });
    });
  }, []);

  const handleLogOut = () => {
    dispatch(signOut());
  };

  const googleSignIn = () => {
    dispatch(googleAuth());
  };

  return (
    <div className="app__header header">
      <div className="header__title">
        <h1>News site</h1>
      </div>
      {token ? (
        <div>
          <Button onClick={handleLogOut} type="primary">LOGOUT</Button>
        </div>
      ) : (
        <div>
          <Button href="/sign_in" type="primary">LOGIN</Button>
          {' '}
          <Button href="/sign_up" type="primary">Register</Button>
          {' '}
          <Button onClick={googleSignIn} type="primary">Sign in with google</Button>
        </div>

      )}
    </div>
  );
};

export default Header;
