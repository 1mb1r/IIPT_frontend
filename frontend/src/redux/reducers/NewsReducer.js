// import ActionTypes from '../constants/action-types';

const initialState = {
  news: [],
  fetching: false,
  error: null,
};

const NewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEWS_REQUESTED':
      return { ...state, error: null, fetching: true };
    case 'NEWS_RECEIVED':
      return {
        ...state, news: action.news, fetching: false, error: null,
      };
    case 'NEWS_REJECTED':
      return { ...state, error: action.error, fetching: false };
    default:
      return state;
  }
};

export default NewsReducer;
