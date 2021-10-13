import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';

import Api from '../../api';
import ActionTypes from '../constants/action-types';
import { setToken } from '../../lib/local-storage';

function* googleAuth() {
  try {
    const auth2 = yield window.gapi.auth2.getAuthInstance();
    const googleResponse = yield auth2.signIn();
    const response = yield call(Api.post, '/users/auth/google_oauth2/callback', { response: googleResponse });
    yield put({ type: ActionTypes.GOOGLE_AUTH_RECEIVED, payload: response });
    yield setToken(response.headers.authorization.replace('Bearer', '').trim());
  } catch (error) {
    yield put({ type: ActionTypes.GOOGLE_AUTH_REJECTED, error: error.message });
  }
}

function* watchGoogle() {
  yield takeEvery(ActionTypes.GOOGLE_AUTH_REQUESTED, googleAuth);
}

export default watchGoogle;
