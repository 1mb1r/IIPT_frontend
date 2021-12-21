import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';
import { gapi } from 'gapi-script';

import Api from '../../api';
import ActionTypes from '../constants/action-types';
import { setToken } from '../../lib/local-storage';

let auth2 = null;
let googleResponse = null;
let profile = null;

function* googleAuth() {
  try {
    auth2 = yield gapi.auth2.getAuthInstance();
    googleResponse = yield auth2.signIn();
    profile = googleResponse.getBasicProfile();
    let response = yield call(Api.post, '/users/sign_in', { user: { email: profile.getEmail(), password: profile.getEmail() } });
    if (!response.headers.authorization) {
      response = yield call(Api.post, '/users', { user: { email: profile.getEmail(), password: profile.getEmail() } });
      yield call(Api.put, `/users/${response.data.user.id}`, { username: profile.getName(), google: profile.getImageUrl() });
    }
    yield put({
      type: ActionTypes.GOOGLE_AUTH_RECEIVED,
      payload: response,
      avatar: profile.getImageUrl(),
    });
    yield setToken(response.headers.authorization);
  } catch (error) {
    yield put({ type: ActionTypes.GOOGLE_AUTH_REJECTED, error: error.message });
  }
}

function* watchGoogle() {
  yield takeEvery(ActionTypes.GOOGLE_AUTH_REQUESTED, googleAuth);
}

export default watchGoogle;
