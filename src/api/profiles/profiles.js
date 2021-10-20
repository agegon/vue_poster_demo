import { axios } from '@/api/axios';
import { NotFoundError, UnknownError } from '@/utils/errors';

export const fetchGetProfile = async (username) => {
  try {
    const { data } = await axios.get(`/profiles/${username}`);

    return data;
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.error || undefined;

    if (status === 404) {
      throw new NotFoundError('Profile was not found');
    }

    throw new UnknownError('api/profiles/fetchGetArticle', message);
  }
};

export const fetchFollowProfile = async (username) => {
  try {
    const { data } = await axios.post(`/profiles/${username}/follow`, null);

    return data;
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.error || undefined;

    if (status === 404) {
      throw new NotFoundError('Profile was not found');
    }

    throw new UnknownError('api/profiles/fetchFollowProfile', message);
  }
};

export const fetchUnfollowProfile = async (username) => {
  try {
    const { data } = await axios.delete(`/profiles/${username}/follow`);

    return data;
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.error || undefined;

    if (status === 404) {
      throw new NotFoundError('Profile was not found');
    }

    throw new UnknownError('api/profiles/fetchUnfollowProfile', message);
  }
};
