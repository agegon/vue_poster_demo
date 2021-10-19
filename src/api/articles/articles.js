import { axios } from '@/api/axios';
import { NotFoundError, UnknownError, ValidationError } from '@/utils/errors';

export const fetchGetArticles = async (params) => {
  try {
    const { data } = await axios.get('/articles', { params });

    return data;
  } catch (error) {
    const message = error?.response?.data?.error || undefined;
    throw new UnknownError('api/articles/fetchGetArticles', message);
  }
};

export const fetchGetFeedArticles = async (params) => {
  try {
    const { data } = await axios.get('/articles/feed', { params });

    return data;
  } catch (error) {
    const message = error?.response?.data?.error || undefined;
    throw new UnknownError('api/articles/fetchGetFeedArticles', message);
  }
};

export const fetchGetArticle = async (slug) => {
  try {
    const { data } = await axios.get(`/articles/${slug}`);

    return data;
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.error || undefined;

    if (status === 404) {
      throw new NotFoundError('Article was not found');
    }

    throw new UnknownError('api/articles/fetchGetArticle', message);
  }
};

export const fetchCreateArticle = async (body) => {
  try {
    const { data } = await axios.post('/articles', body);

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};
    const message = data?.error || undefined;

    if (status === 422 && data?.errors) {
      throw new ValidationError({
        message: 'Create article validation error',
        errors: data.errors,
      });
    }

    throw new UnknownError('api/articles/fetchCreateArticle', message);
  }
};

export const fetchUpdateArticle = async (slug, body) => {
  try {
    const { data } = await axios.patch(`/articles/${slug}`, body);

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};
    const message = data?.error || undefined;

    if (status === 422 && data?.errors) {
      throw new ValidationError({
        message: 'Update article validation error',
        errors: data.errors,
      });
    }

    throw new UnknownError('api/articles/fetchUpdateArticle', message);
  }
};

export const fetchDeleteArticle = async (slug) => {
  try {
    await axios.delete(`/articles/${slug}`);

    return true;
  } catch (error) {
    const message = error?.response?.data?.error || undefined;
    throw new UnknownError('api/articles/fetchDeleteArticle', message);
  }
};
