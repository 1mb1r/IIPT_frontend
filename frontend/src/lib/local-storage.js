/* eslint-disable no-console */
/* eslint-disable consistent-return */
export const deleteToken = () => {
  try { localStorage.removeItem('token'); } catch (error) { console.error(error.message); }
};

export const readToken = () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) throw new Error('no token');
    return token;
  } catch (error) { console.error(error.message); return null; }
};

export const setToken = (response) => {
  try { localStorage.setItem('token', JSON.stringify(response)); } catch (error) { console.error(error.message); }
};
