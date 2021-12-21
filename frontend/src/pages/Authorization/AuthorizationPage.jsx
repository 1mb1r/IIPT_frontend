/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Alert, Form, Button, Input,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { signIn, googleAuth } from '../../redux/actions/postsActionGenerators';
// import { getHashedPassword } from '../../lib/utils';

const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const { token, fetching, error } = useSelector((state) => state.userData);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleLogIn = () => {
    dispatch(signIn({ email, password }));
  };

  const googleSignIn = () => {
    dispatch(googleAuth());
  };

  if (fetching) {
    return 'Loading...';
  }

  if (token) {
    history.push('/');
  }

  return (
    <div className="login-form">
      {error && <Alert message="incorrect email or password" type="error" />}
      <Form
        name="normal_login"
        className="login-form"
        onFinish={handleLogIn}
      >
        <Form.Item
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          onChange={(event) => setPassword(event.target.value)}
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or
          {' '}
          <a href="/sign_up">register now!</a>
        </Form.Item>
      </Form>
      <Button type="primary" className="login-google-button" onClick={googleSignIn}>
        Login with google
      </Button>

    </div>
  );
};

export default AuthorizationPage;
