import { all } from 'redux-saga/effects';
import fetchNews from './sagas/fetchNews';

function* rootSaga() {
  yield all(
    [
      fetchNews(),
    ],
  );
}

export default rootSaga;
