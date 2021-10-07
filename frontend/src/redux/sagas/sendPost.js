import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';
import Api from '../../api';

function setPost(payload) {
  const {
    title, content, tag, image, author, userId, token,
  } = payload;
  return Api.post('/posts', {
    post: {
      title, content, tag, image, author, user_id: userId,
    },
  }, {
    headers: { Authorization: `Bearer ${token}` },
    'Content-Type': 'application/json',
  });
}

function* sendPost(action) {
  try {
    const { data } = yield call(setPost, action.payload);
    const response = data;
    yield put({
      type: 'SEND_POST_RECEIVED',
      posts: response,
    });
  } catch (e) {
    yield put({ type: 'SEND_POST_REJECTED', error: e.message });
  }
}

function* watchSendPost() {
  yield takeEvery('SEND_POST_REQUESTED', sendPost);
}

export default watchSendPost;
