/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar, Alert, Pagination, Button, Modal, Input, Form,
} from 'antd';

import token from '../../token';
import PostComponent from '../../components/posts/PostComponent';
import { getUser, editUser, sendPost } from '../../redux/actions/postsActionGenerators';

import './UserPage.css';

const postsPerPage = 1;

const UserPage = (props) => {
  const { match } = props;
  const { id } = match.params;
  const { allPosts } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, allPosts, id]);
  const { userData, fetching, error } = useSelector((state) => state.userData);
  const { posts } = userData;
  const [modalType, setModalType] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usernameValue, setUsernameValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (modalType === 'edit') {
      const editedUserData = { username: usernameValue, id, token };
      dispatch(editUser(editedUserData));
    } else if (modalType === 'create') {
      const postData = {
        title: titleValue, content: contentValue, image: 'url', tag: tagValue, author: userData.username, userId: id, token,
      };
      dispatch(sendPost(postData));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalType = (type) => {
    setModalType(type);
    showModal();
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

  return (
    <div className="app__user-page user-page">
      <div className="user-page__user-info user-info">
        <Avatar
          size={{
            xxl: 200,
          }}
          src={userData.avatar}
          className="user-info__avatar"
        />
        <div className="user-info__username username">
          <h1 className="username__header">{userData.username}</h1>
          <Button className="username__edit-button" type="primary" onClick={() => handleModalType('edit')}>Edit profile</Button>
        </div>
      </div>
      <Button className="user-page__add-post" type="primary" onClick={() => handleModalType('create')}>Add new post</Button>
      <div className="user-page__posts-cards posts-cards">
        {posts.slice(currentPage * postsPerPage,
          (currentPage + 1) * postsPerPage).map((el) => (
            <PostComponent
              key={el.id}
              userId={el.user_id}
              title={el.title}
              content={el.content}
              tags={el.tag}
              author={String(el.author)}
              image={el.image}
            />
        ))}
      </div>
      <div className="user-page__pagination pagination">
        <Pagination
          onChange={(page) => setCurrentPage(page - 1)}
          total={totalPages}
          current={currentPage + 1}
          pageSize={postsPerPage}
        />
      </div>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        { modalType === 'edit' && (
          <Form.Item name="username" label="New username" rules={[{ required: true }]} onChange={(event) => setUsernameValue(event.target.value)}>
            <Input />
          </Form.Item>
        )}
        { modalType === 'create' && (
          <div className="modal__create">
            <Form.Item name="title" label="Title" rules={[{ required: true }]} onChange={(event) => setTitleValue(event.target.value)}>
              <Input />
            </Form.Item>
            <Form.Item name="tag" label="Tag" rules={[{ required: true }]} onChange={(event) => setTagValue(event.target.value)}>
              <Input />
            </Form.Item>
            <Form.Item name="Content" label="Content" rules={[{ required: true }]} onChange={(event) => setContentValue(event.target.value)}>
              <Input.TextArea />
            </Form.Item>
          </div>
        )}
      </Modal>
    </div>
  );
};

UserPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UserPage;
