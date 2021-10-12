/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar, Alert, Pagination, Button,
} from 'antd';

import PostComponent from '../../components/posts/PostComponent';
import UserPageModal from '../../components/modal/UserPageModal';
import {
  getUser, editUser, authUser,
} from '../../redux/actions/postsActionGenerators';

import './UserPage.css';

const postsPerPage = 1;
const editType = 'edit';
const createType = 'create';

const UserPage = (props) => {
  const { match } = props;
  const { id } = match.params;
  const { allPosts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, allPosts, id]);

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  const { userData, fetching, error } = useSelector((state) => state.userData);
  const { posts } = userData;
  const [image, setImage] = useState(null);
  const [modalType, setModalType] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.userData);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalType = (type) => {
    setModalType(type);
    showModal();
  };

  const handleAvatar = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSetAvatar = () => {
    const avatarData = { id, avatar: image };
    dispatch(editUser(avatarData));
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
        <div className="user-info__avatar avatar">
          <Avatar
            size={{
              xxl: 200,
            }}
            src={process.env.REACT_APP_API_URL + userData.avatar.url}
          />
          {currentUser && currentUser?.id === userData.id && (
          <div className="avatar__upload upload">
            <input type="file" onChange={handleAvatar} />
            <button type="submit" onClick={handleSetAvatar}>Upload avatar</button>
          </div>
          )}
        </div>
        <div className="user-info__username username">
          <h1 className="username__header">{userData.username}</h1>
          {currentUser && currentUser?.id === userData.id && <Button className="username__edit-button" type="primary" onClick={() => handleModalType(editType)}>Edit profile</Button>}
        </div>
      </div>
      {currentUser && currentUser?.id === userData.id && <Button className="user-page__add-post" type="primary" onClick={() => handleModalType(createType)}>Add new post</Button> }
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
              image={el.image.url}
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
      <UserPageModal
        modalType={modalType}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
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
