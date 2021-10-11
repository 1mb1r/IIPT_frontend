import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';

function* authenticateUser() {
  try {
    const response = yield call(Api.post, '/users/sign_in');
    yield put({
      type: ActionTypes.AUTH_RECEIVED,
      payload: response,
    });
  } catch (error) {
    yield put({ type: ActionTypes.AUTH_REJECTED, error: error.message });
  }
}

function* watchAuthUser() {
  yield takeEvery(ActionTypes.AUTH_REQUESTED, authenticateUser);
}

export default watchAuthUser;
