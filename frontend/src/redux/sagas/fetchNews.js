import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';
import Api from '../../api';

function* fetchNews() {
  try {
    const { data } = yield call(Api.get, '/news');
    const response = data;
    yield put({ type: 'NEWS_RECEIVED', news: response });
  } catch (e) {
    yield put({ type: 'NEWS_REJECTED', error: e.message });
  }
}

function* watchFetchNews() {
  yield takeEvery('NEWS_REQUESTED', fetchNews);
}

export default watchFetchNews;
