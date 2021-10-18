import { axios } from '@/api/axios';
import { UnknownError, ValidationError } from '@/utils/errors';

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

export const fetchGetArticle = async (slug) => {
  try {
    const { data } = await axios.get(`/articles/${slug}`);

    return data;
  } catch (error) {
    throw new UnknownError('api/articles/fetchGetArticle');
  }
};

export const fetchCreateArticle = async (body) => {
  try {
    const { data } = await axios.post('/articles', body);

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};

    if (status === 422 && data?.errors) {
      throw new ValidationError({
        message: 'Create article validation error',
        errors: data.errors,
      });
    }

    throw new UnknownError('api/articles/fetchCreateArticle');
  }
};

export const fetchUpdateArticle = async (slug, body) => {
  try {
    const { data } = await axios.put(`/articles/${slug}`, body);

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};

    if (status === 422 && data?.errors) {
      throw new ValidationError({
        message: 'Update article validation error',
        errors: data.errors,
      });
    }

    throw new UnknownError('api/articles/fetchUpdateArticle');
  }
};

export const fetchDeleteArticle = async (slug) => {
  try {
    await axios.delete(`/articles/${slug}`);

    return true;
  } catch (error) {
    throw new UnknownError('api/articles/fetchDeleteArticle');
  }
};
