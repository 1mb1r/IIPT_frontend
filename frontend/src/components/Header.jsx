import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../redux/actions/postsActionGenerators';

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData);

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
        </div>
      ) : (
        <div>
          <Button href="/sign_in" type="primary">LOGIN</Button>
          {' '}
          <Button href="/sign_up" type="primary">Register</Button>
        </div>

      )}
    </div>
  );
};

export default Header;
