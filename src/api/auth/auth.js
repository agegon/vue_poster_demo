import { axios } from '@/api/axios';
import { ValidationError } from '@/utils/errors/validationError';
import { UnknownError } from '@/utils/errors/unknownError';

export const fetchRegisterUser = async (user) => {
  try {
    const { data } = await axios.post('/users', { user });

    return data;
  } catch (error) {
    const response = error?.response;

    if (response?.status === 422) {
      throw new ValidationError({
        message: 'Register user validation error',
        errors: response.data.errors,
      });
    }

    throw new UnknownError('api/auth/registerUser');
  }
};
