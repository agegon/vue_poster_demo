import axios from 'axios';
import { API_HOST } from '@/constants/environment';

const axiosInstance = axios.create({
  baseURL: API_HOST + '/api',
});

export const setAxiosAuthorization = (token) => {
  const authToken = 'Token ' + token;
  axiosInstance.defaults.headers.common['Authorization'] = authToken;
};

export const clearAxiosAuthorization = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export { axiosInstance as axios };
