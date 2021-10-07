import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';
import Api from '../../api';

function* fetchUser(action) {
  try {
    const { data } = yield call(Api.get, `/users/${action.payload}`);
    const response = data;
    yield put({
      type: 'USER_RECEIVED',
      userData: response,
    });
  } catch (e) {
    yield put({ type: 'USER_REJECTED', error: e.message });
  }
}

function* watchFetchUser() {
  yield takeEvery('USER_REQUESTED', fetchUser);
}

export default watchFetchUser;
