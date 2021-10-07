import ActionTypes from '../constants/action-types';

const initialState = {
  posts: [],
  fetching: false,
  error: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.POSTS_REQUESTED:
      return { ...state, error: null, fetching: true };
    case ActionTypes.POSTS_RECEIVED:
      return {
        ...state, posts: action.payload, fetching: false, error: null,
      };
    case ActionTypes.POSTS_REJECTED:
      return { ...state, error: action.error, fetching: false };
    case ActionTypes.SEND_POST_REQUESTED:
      return { ...state, error: null, fetching: true };
    case ActionTypes.SEND_POST_RECEIVED:
      return {
        ...state, posts: action.payload, fetching: false, error: null,
      };
    case ActionTypes.SEND_POST_REJECTED:
      return { ...state, error: action.error, fetching: false };
    default:
      return state;
  }
};

export default postsReducer;
