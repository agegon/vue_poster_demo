import { axios } from '@/api/axios';
import { UnknownError } from '@/utils/errors';

export const fetchGetTags = async () => {
  try {
    const { data } = await axios.get('/tags');

    return data;
  } catch (error) {
    const message = error?.response?.data?.error || undefined;
    throw new UnknownError('api/tags/fetchGetTags', message);
  }
};
