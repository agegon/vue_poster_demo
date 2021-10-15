import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.realworld.io/api',
});

export { axiosInstance as axios };
