import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';
import Api from '../../api';

function updateUser(payload) {
  const { id, username, token } = payload;
  return Api.put(`/users/${id}`, { username }, {
    headers: { Authorization: `Bearer ${token}` },
    'Content-Type': 'application/json',
  });
}

function* editUser(action) {
  try {
    const { data } = yield call(updateUser, action.payload);
    const response = data;
    yield put({
      type: 'EDIT_USER_RECEIVED',
      userData: response,
    });
  } catch (e) {
    yield put({ type: 'EDIT_USER_REJECTED', error: e.message });
  }
}

function* watchEditUser() {
  yield takeEvery('EDIT_USER_REQUESTED', editUser);
}

export default watchEditUser;
