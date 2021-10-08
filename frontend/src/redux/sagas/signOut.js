import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';

function* signOut() {
  try {
    yield call(Api.delete, '/users/sign_out');
    yield put({
      type: ActionTypes.SIGN_OUT_RECEIVED,
    });
  } catch (error) {
    yield put({ type: ActionTypes.SIGN_OUT_REJECTED, error: error.message });
  }
}

function* watchSignOut() {
  yield takeEvery(ActionTypes.SIGN_OUT_REQUESTED, signOut);
}

export default watchSignOut;
