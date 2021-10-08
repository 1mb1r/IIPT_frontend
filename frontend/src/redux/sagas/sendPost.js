import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';

function setPost(payload) {
  const {
    title, content, tag, image, author, userId,
  } = payload;
  return Api.post('/posts', {
    post: {
      title, content, tag, image, author, user_id: userId,
    },
  });
}

function* sendPost(action) {
  try {
    const { data } = yield call(setPost, action.payload);
    yield put({
      type: ActionTypes.SEND_POST_RECEIVED,
      payload: data,
    });
  } catch (error) {
    yield put({ type: ActionTypes.SEND_POST_REJECTED, error: error.message });
  }
}

function* watchSendPost() {
  yield takeEvery(ActionTypes.SEND_POST_REQUESTED, sendPost);
}

export default watchSendPost;
