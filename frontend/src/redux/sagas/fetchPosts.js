import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';

function* fetchPosts() {
  try {
    const { data } = yield call(Api.get, '/posts');
    yield put({
      type: ActionTypes.POSTS_RECEIVED,
      payload: data,
    });
  } catch (error) {
    yield put({ type: ActionTypes.POSTS_REJECTED, error: error.message });
  }
}

function* watchFetchPosts() {
  yield takeEvery(ActionTypes.POSTS_REQUESTED, fetchPosts);
}

export default watchFetchPosts;
