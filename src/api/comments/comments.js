import { axios } from '@/api/axios';
import { AuthorizationError, UnknownError, ValidationError } from '@/utils/errors';

export const fetchGetComments = async (slug) => {
  try {
    const { data } = await axios.get(`/articles/${slug}/comments`);

    return data;
  } catch (error) {
    const { data } = error?.response || {};
    const message = data?.error || undefined;

    throw new UnknownError('api/comments/fetchGetComments', message);
  }
};

export const fetchCreateComment = async (slug, body) => {
  try {
    const { data } = await axios.post(`/articles/${slug}/comments`, body);

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};
    const message = data?.error || undefined;

    if (status === 422 && data?.errors) {
      throw new ValidationError({
        message: 'Create comment validation error',
        errors: data.errors,
      });
    }

    if (status === 403) {
      throw new AuthorizationError();
    }

    throw new UnknownError('api/comments/fetchCreateComment', message);
  }
};

export const fetchDeleteComment = async (slug, id) => {
  try {
    const { data } = await axios.delete(`/articles/${slug}/comments/${id}`);

    return data;
  } catch (error) {
    const status = error?.response?.status;

    if (status === 403) {
      throw new AuthorizationError();
    }

    throw new UnknownError('api/comments/fetchDeleteComment');
  }
};
