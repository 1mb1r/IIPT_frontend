/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Alert, Form, Button, Input,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { signUp } from '../../redux/actions/postsActionGenerators';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const { token, fetching, error } = useSelector((state) => state.userData);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleSignUp = () => {
    dispatch(signUp({ email, password, username }));
  };

  if (fetching) {
    return 'Loading...';
  }

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
      return <Alert message={error} type="error" />;
    }
    return 'Error: hidden';
  }

  const onFinish = () => {
    handleSignUp();
  };

  if (token) {
    history.push('/');
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        onChange={(event) => setUsername(event.target.value)}
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
      </Form.Item>
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
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationPage;
