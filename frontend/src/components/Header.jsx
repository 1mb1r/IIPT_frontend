/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { gapi } from 'gapi-script';

import { signOut } from '../redux/actions/postsActionGenerators';

const Header = () => {
  const dispatch = useDispatch();
  const { token, currentUser } = useSelector((state) => state.userData);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2
        .init({
          client_id:
          process.env.REACT_APP_GOOGLE_CLIENT_ID,
        });
    });
  }, []);

  const handleLogOut = () => {
    dispatch(signOut());
  };

  return (
    <div className="app__header header">
      <div className="header__title">
        <h1>News site</h1>
      </div>
      {token ? (
        <div>
          <Button onClick={handleLogOut} type="primary">LOGOUT</Button>
          {' '}
          { (window.location.pathname === '/') && <Button href={`/users/${currentUser?.id}`} type="primary">SEE MY PAGE</Button>}
          {' '}
          { (window.location.pathname !== '/') && <Button href="/" type="primary">Main page</Button>}
        </div>
      ) : (
        <div>
          {(window.location.pathname !== '/sign_in' && window.location.pathname !== '/sign_up') && (
          <>
            <Button href="/sign_in" type="primary">LOGIN</Button>
            {' '}
            <Button href="/sign_up" type="primary">Register</Button>
            {' '}
          </>
          )}
          {' '}
          { (window.location.pathname !== '/') && <Button href="/" type="primary">Main page</Button>}
        </div>
      )}
    </div>
  );
};

export default Header;
