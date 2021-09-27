import { takeEvery } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';
import Api from '../../api';

function* fetchNews() {
  try {
    const { data } = yield call(Api.get, '/news');
    const response = data;
    yield put({ type: 'SET_NEWS_SUCCEEDED', news: response });
  } catch (e) {
    yield put({ type: 'SET_NEWS_FAILED', message: e.message });
  }
}

function* watchFetchNews() {
  yield takeEvery('SET_NEWS', fetchNews);
}

export default watchFetchNews;
