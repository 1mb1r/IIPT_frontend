const initialState = {
  userData: { posts: [] },
  fetching: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_REQUESTED':
      return { ...state, error: null, fetching: true };
    case 'USER_RECEIVED':
      return {
        ...state, userData: action.payload, fetching: false,
      };
    case 'USER_REJECTED':
      return { ...state, error: action.error, fetching: false };
    case 'EDIT_USER_REQUESTED':
      return { ...state, error: null, fetching: true };
    case 'EDIT_USER_RECEIVED':
      return {
        ...state, userData: action.payload, fetching: false,
      };
    case 'EDIT_USER_REJECTED':
      return { ...state, error: action.error, fetching: false };
    default:
      return state;
  }
};

export default userReducer;
