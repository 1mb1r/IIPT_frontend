import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

Api.interceptors.request.use(
  (config) => {
    const customConfig = config;
    customConfig.headers.Authorization = JSON.parse(localStorage.getItem('token'));
    customConfig.headers['Content-Type'] = 'application/json';
    return customConfig;
  },
  (error) => Promise.reject(error),
);

export default Api;
