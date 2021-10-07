import { createAction } from 'redux-actions';

import ActionTypes from '../constants/action-types';

export const setPosts = createAction(ActionTypes.POSTS_REQUESTED);

export const getUser = createAction(ActionTypes.USER_REQUESTED);

export const editUser = createAction(ActionTypes.EDIT_USER_REQUESTED);

export const sendPost = createAction(ActionTypes.SEND_POST_REQUESTED);