import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';
import { setToken } from '../../lib/local-storage';

function* signUp(action) {
  const info = { user: action.payload };
  try {
    const response = yield call(Api.post, '/users', info);
    yield call(Api.put, `/users/${response.data.user.id}`, { username: action.payload.username });
    yield put({
      type: ActionTypes.SIGN_IN_RECEIVED,
      payload: response,
    });
    yield setToken(response.headers.authorization);
  } catch (error) {
    yield put({ type: ActionTypes.SIGN_IN_REJECTED, error: error.message });
  }
}

function* watchSignUp() {
  yield takeEvery(ActionTypes.SIGN_UP_REQUESTED, signUp);
}

export default watchSignUp;
