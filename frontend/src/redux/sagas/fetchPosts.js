import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';
import Api from '../../api';

function* fetchPosts() {
  try {
    const { data } = yield call(Api.get, '/posts');
    const response = data;
    yield put({
      type: 'POSTS_RECEIVED',
      posts: response,
    });
  } catch (e) {
    yield put({ type: 'POSTS_REJECTED', error: e.message });
  }
}

function* watchFetchPosts() {
  yield takeEvery('POSTS_REQUESTED', fetchPosts);
}

export default watchFetchPosts;
