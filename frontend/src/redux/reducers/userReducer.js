import ActionTypes from '../constants/action-types';

const initialState = {
  userData: { posts: [] },
  fetching: false,
  error: null,
  currentUser: JSON.parse(localStorage.getItem('currentUser')),
  token: JSON.parse(localStorage.getItem('token')),
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
    case ActionTypes.SIGN_IN_REQUESTED:
      return { ...state, error: null, fetching: true };
    case ActionTypes.SIGN_IN_RECEIVED:
      return {
        ...state,
        currentUser: action.payload.data.user,
        token: action.payload.headers.authorization,
        fetching: false,
      };
    case ActionTypes.SIGN_IN_REJECTED:
      return { ...state, error: action.error, fetching: false };
    case ActionTypes.SIGN_OUT_REQUESTED:
      return { ...state, error: null, fetching: true };
    case ActionTypes.SIGN_OUT_RECEIVED:
      return {
        ...state, token: null, fetching: false,
      };
    case ActionTypes.SIGN_OUT_REJECTED:
      return { ...state, error: action.error, fetching: false };
    case ActionTypes.SIGN_UP_REQUESTED:
      return { ...state, error: null, fetching: true };
    case ActionTypes.SIGN_UP_RECEIVED:
      return {
        ...state,
        currentUser: action.payload.data.user,
        token: action.payload.headers.authorization,
        fetching: false,
      };
    case ActionTypes.SIGN_UP_REJECTED:
      return { ...state, error: action.error, fetching: false };
    case ActionTypes.AUTH_REQUESTED:
      return { ...state, error: null, fetching: true };
    case ActionTypes.AUTH_RECEIVED:
      return {
        ...state,
        currentUser: action.payload.data.user,
        fetching: false,
      };
    case ActionTypes.AUTH_REJECTED:
      return { ...state, error: action.error, fetching: false };
    default:
      return state;
  }
};

export default userReducer;
