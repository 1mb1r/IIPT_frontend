import { combineReducers } from 'redux';
import NewsReducer from './NewsReducer';

const reducers = combineReducers({
  allNews: NewsReducer,
});
export default reducers;
