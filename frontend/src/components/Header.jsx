import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../redux/actions/postsActionGenerators';

const Header = () => {
  const dispatch = useDispatch();
  const { token, currentUser } = useSelector((state) => state.userData);

  const handleLogOut = () => {
    dispatch(signOut());
  };

  return (
    <div className="app__header header">
      <div className="header__title">
        News site
      </div>
      {!token && (
      <div>
        <Button href="/sign_in" type="primary">LOGIN</Button>
        {' '}
        <Button href="/sign_up" type="primary">Register</Button>
      </div>
      )}
      {token && (
      <div>
        <Button onClick={handleLogOut} type="primary">LOGOUT</Button>
        {' '}
        <Button href={`/users/${currentUser.id}`} type="primary">See your page</Button>
      </div>
      )}
    </div>
  );
};

export default Header;
