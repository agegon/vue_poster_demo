import { fetchRegisterUser } from '@/api/auth';
import { ValidationError } from '@/utils/errors';
import { createAction } from '@/utils/vuexHelpers';
import { setItemToStorage } from '@/utils/storage';

import { authRegisterFailure, authRegisterRequest, authRegisterSuccess } from './mutations';

const AUTH_TOKEN = 'jwtToken';

const AUTH_ACTIONS = {
  REGISTER: 'auth/register',
};

export const actions = {
  [AUTH_ACTIONS.REGISTER]: async ({ commit }, action) => {
    try {
      commit(authRegisterRequest());

      const { user } = await fetchRegisterUser(action.payload);
      commit(authRegisterSuccess(user));
      setItemToStorage(AUTH_TOKEN, user.token);

      return user;
    } catch (error) {
      if (error instanceof ValidationError) {
        commit(authRegisterFailure({ validationErrors: error.errors }));
        return;
      }

      commit(authRegisterFailure({ error: error.message }));
    }
  },
};

export const registerUser = createAction(AUTH_ACTIONS.REGISTER);
