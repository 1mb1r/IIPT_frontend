const initialState = {
  posts: [],
  fetching: false,
  error: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POSTS_REQUESTED':
      return { ...state, error: null, fetching: true };
    case 'POSTS_RECEIVED':
      return {
        ...state, posts: action.payload, fetching: false, error: null,
      };
    case 'POSTS_REJECTED':
      return { ...state, error: action.error, fetching: false };
    case 'SEND_POST_REQUESTED':
      return { ...state, error: null, fetching: true };
    case 'SEND_POST_RECEIVED':
      return {
        ...state, posts: action.payload, fetching: false, error: null,
      };
    case 'SEND_POST_REJECTED':
      return { ...state, error: action.error, fetching: false };
    default:
      return state;
  }
};

export default postsReducer;
