import ActionTypes from '../constants/action-types';

export const setNews = (news) => ({
  type: ActionTypes.NEWS_REQUESTED,
  payload: news,
});

export default setNews;
