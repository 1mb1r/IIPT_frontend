import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';

function* signUp(action) {
  const info = { user: action.payload };
  try {
    const response = yield call(Api.post, '/users', info);
    yield put({
      type: ActionTypes.SIGN_IN_RECEIVED,
      payload: response,
    });
    yield localStorage.setItem('token', JSON.stringify(response.headers.authorization));
    yield localStorage.setItem('currentUser', JSON.stringify(response.data.user));
  } catch (error) {
    yield put({ type: ActionTypes.SIGN_IN_REJECTED, error: error.message });
  }
}

function* watchSignUp() {
  yield takeEvery(ActionTypes.SIGN_UP_REQUESTED, signUp);
}

export default watchSignUp;
