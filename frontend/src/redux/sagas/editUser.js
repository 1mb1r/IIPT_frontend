import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';

function updateUser(payload) {
  const { id, username, token } = payload;
  return Api.put(`/users/${id}`, { username }, { token });
}

function* editUser(action) {
  try {
    const { data } = yield call(updateUser, action.payload);
    yield put({
      type: ActionTypes.EDIT_USER_RECEIVED,
      payload: data,
    });
  } catch (error) {
    yield put({ type: ActionTypes.EDIT_USER_REJECTED, error: error.message });
  }
}

function* watchEditUser() {
  yield takeEvery(ActionTypes.EDIT_USER_REQUESTED, editUser);
}

export default watchEditUser;
