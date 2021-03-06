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
    const message = data?.error || undefined;

    if (status === 422 && data?.errors) {
      throw new ValidationError({
        message: 'Register user validation error',
        errors: data.errors,
      });
    }

    throw new UnknownError('api/auth/fetchRegisterUser', message);
  }
};

export const fetchLoginUser = async (user) => {
  try {
    const { data } = await axios.post('/users/login', { user });

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};
    const message = data?.error || undefined;

    if ([401, 422].includes(status) && data?.errors) {
      throw new ValidationError({
        message: 'Login user validation error',
        errors: data.errors,
      });
    }

    throw new UnknownError('api/auth/fetchLoginUser', message);
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

export const fetchUpdateCurrentUser = async (body) => {
  try {
    const { data } = await axios.patch('/user', body);

    return data;
  } catch (error) {
    const { data, status } = error?.response || {};
    const message = data?.error || undefined;

    if (status === 422 && data?.errors) {
      throw new ValidationError({
        message: 'Update user validation error',
        errors: data.errors,
      });
    }

    if (status === 401) {
      throw new AuthorizationError();
    }

    throw new UnknownError('api/auth/fetchUpdateCurrentUser', message);
  }
};
