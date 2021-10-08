import { all } from 'redux-saga/effects';

import fetchPosts from './sagas/fetchPosts';
import fetchUser from './sagas/fetchUser';
import editUser from './sagas/editUser';
import sendPost from './sagas/sendPost';
import signOut from './sagas/signOut';
import signIn from './sagas/signIn';
import signUp from './sagas/signUp';

function* rootSaga() {
  yield all(
    [
      fetchPosts(),
      fetchUser(),
      editUser(),
      sendPost(),
      signIn(),
      signOut(),
      signUp(),
    ],
  );
}

export default rootSaga;
