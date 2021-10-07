import ActionTypes from '../constants/action-types';

const initialState = {
  userData: { posts: [] },
  fetching: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_REQUESTED:
      return { ...state, error: null, fetching: true };
    case ActionTypes.USER_RECEIVED:
      return {
        ...state, userData: action.payload, fetching: false,
      };
    case ActionTypes.USER_REJECTED:
      return { ...state, error: action.error, fetching: false };
    case ActionTypes.EDIT_USER_REQUESTED:
      return { ...state, error: null, fetching: true };
    case ActionTypes.EDIT_USER_RECEIVED:
      return {
        ...state, userData: action.payload, fetching: false,
      };
    case ActionTypes.EDIT_USER_REJECTED:
      return { ...state, error: action.error, fetching: false };
    default:
      return state;
  }
};

export default userReducer;
