import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';

function* fetchUser(action) {
  try {
    const { data } = yield call(Api.get, `/users/${action.payload}`);
    yield put({
      type: ActionTypes.USER_RECEIVED,
      payload: data,
    });
  } catch (error) {
    yield put({ type: ActionTypes.USER_REJECTED, error: error.message });
  }
}

function* watchFetchUser() {
  yield takeEvery(ActionTypes.USER_REQUESTED, fetchUser);
}

export default watchFetchUser;
