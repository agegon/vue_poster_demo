import { axios } from '@/api/axios';
import { ValidationError } from '@/utils/errors/validationError';
import { UnknownError } from '@/utils/errors/unknownError';
import { AuthorizationError } from '@/utils/errors';

export const fetchRegisterUser = async (user) => {
  try {
    const { data } = await axios.post('/users', { user });

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};

    if (status === 422 && data?.errors) {
      throw new ValidationError({
        message: 'Register user validation error',
        errors: data.errors,
      });
    }

    throw new UnknownError('api/auth/fetchRegisterUser');
  }
};

export const fetchLoginUser = async (user) => {
  try {
    const { data } = await axios.post('/users/login', { user });

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};

    if ([403, 422].includes(status) && data?.errors) {
      throw new ValidationError({
        message: 'Login user validation error',
        errors: data.errors,
      });
    }

    throw new UnknownError('api/auth/fetchLoginUser');
  }
};

export const fetchGetCurrentUser = async () => {
  try {
    const { data } = await axios.get('/user');

    return data;
  } catch (error) {
    const status = error?.response?.status;

    if (status === 401) {
      throw new AuthorizationError();
    }

    throw new UnknownError('api/auth/fetchGetCurrentUser');
  }
};
