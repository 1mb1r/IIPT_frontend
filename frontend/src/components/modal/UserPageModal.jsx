import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal, Input, Form,
} from 'antd';

import {
  editUser, sendPost,
} from '../../redux/actions/postsActionGenerators';

const editType = 'edit';
const createType = 'create';

const UserPageModal = (props) => {
  const { modalType, isModalVisible, setIsModalVisible } = props;
  const { userData } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [usernameValue, setUsernameValue] = useState('');
  const [image, setImage] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [contentValue, setContentValue] = useState('');

  const handleSubmit = () => {
    setIsModalVisible(false);
    if (modalType === editType) {
      const editedUserData = { username: usernameValue, id: userData.id };
      dispatch(editUser(editedUserData));
    } else if (modalType === createType) {
      const postData = {
        title: titleValue,
        content: contentValue,
        image,
        tag: tagValue,
        author: userData.username,
        userId: userData.id,
      };
      dispatch(sendPost(postData));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
      { modalType === editType && (
      <Form.Item name="username" label="New username" rules={[{ required: true }]} onChange={(event) => setUsernameValue(event.target.value)}>
        <Input />
      </Form.Item>
      )}
      { modalType === createType && (
      <div className="modal__create">
        <Form.Item name="title" label="Title" rules={[{ required: true }]} onChange={(event) => setTitleValue(event.target.value)}>
          <Input />
        </Form.Item>
        <Form.Item name="tag" label="Tag" rules={[{ required: true }]} onChange={(event) => setTagValue(event.target.value)}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]} onChange={(event) => setContentValue(event.target.value)}>
          <Input.TextArea />
        </Form.Item>
        <input type="file" onChange={(event) => setImage(event.target.files[0])} />
      </div>
      )}
    </Modal>
  );
};

UserPageModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default UserPageModal;
