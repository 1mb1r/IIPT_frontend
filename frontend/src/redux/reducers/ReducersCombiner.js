import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  allPosts: postsReducer,
  userData: userReducer,
});
export default reducers;
