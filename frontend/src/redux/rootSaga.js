import { all } from 'redux-saga/effects';
import fetchPosts from './sagas/fetchPosts';
import fetchUser from './sagas/fetchUser';
import editUser from './sagas/editUser';
import sendPost from './sagas/sendPost';

function* rootSaga() {
  yield all(
    [
      fetchPosts(),
      fetchUser(),
      editUser(),
      sendPost(),
    ],
  );
}

export default rootSaga;
