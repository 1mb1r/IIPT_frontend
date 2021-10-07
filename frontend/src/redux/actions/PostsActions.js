import ActionTypes from '../constants/action-types';

export const setPosts = (posts) => ({
  type: ActionTypes.POSTS_REQUESTED,
  payload: posts,
});

export const getUser = (id) => ({
  type: ActionTypes.USER_REQUESTED,
  payload: id,
});

export const editUser = (data) => ({
  type: ActionTypes.EDIT_USER_REQUESTED,
  payload: data,
});

export const sendPost = (postData) => ({
  type: ActionTypes.SEND_POST_REQUESTED,
  payload: postData,
});
