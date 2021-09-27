import ActionTypes from '../constants/action-types';

export const setNews = (news) => ({
  type: ActionTypes.SET_NEWS,
  payload: news,
});

export default setNews;
