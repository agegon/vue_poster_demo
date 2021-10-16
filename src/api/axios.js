import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.realworld.io/api',
});

export const setAxiosAuthorization = (token) => {
  const authToken = 'Token ' + token;
  axiosInstance.defaults.headers.common['Authorization'] = authToken;
};

export const clearAxiosAuthorization = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export { axiosInstance as axios };
