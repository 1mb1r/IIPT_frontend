/* eslint-disable no-console */
/* eslint-disable consistent-return */
export const deleteToken = () => {
  try { localStorage.removeItem('token'); } catch (error) { console.error(error.message); }
};

export const readToken = () => {
  try { return JSON.parse(localStorage.getItem('token')); } catch (error) { console.error(error.message); }
};

export const setToken = (response) => {
  try { localStorage.setItem('token', JSON.stringify(response)); } catch (error) { console.error(error.message); }
};
