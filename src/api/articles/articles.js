import { axios } from '@/api/axios';
import { UnknownError } from '@/utils/errors';

export const fetchGetArticles = async (params) => {
  try {
    const { data } = await axios.get('/articles', { params });

    return data;
  } catch (error) {
    throw new UnknownError('api/articles/fetchGetArticles');
  }
};

export const fetchGetFeedArticles = async (params) => {
  try {
    const { data } = await axios.get('/articles/feed', { params });

    return data;
  } catch (error) {
    throw new UnknownError('api/articles/fetchGetFeedArticles');
  }
};
