// import ActionTypes from '../constants/action-types';

const initialState = {
  news: [],
  fetching: false,
  error: null,
};

const NewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return { ...state, error: null, fetching: true };
    case 'SET_NEWS_SUCCEEDED':
      return {
        ...state, news: action.news, fetching: false, error: null,
      };
    case 'SET_NEWS_FAILED':
      return { ...state, error: action.error, fetching: false };
    default:
      return state;
  }
};

export default NewsReducer;
