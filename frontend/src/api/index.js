import axios from 'axios';

import { readToken } from '../lib/local-storage';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

Api.interceptors.request.use(
  (config) => {
    const { headers } = config;
    headers.Authorization = readToken();
    console.log(headers.Authorization);
    headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error),
);

export default Api;
