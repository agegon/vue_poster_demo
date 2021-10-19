import { clearAxiosAuthorization, setAxiosAuthorization } from '@/api/axios';
import { fetchGetCurrentUser, fetchLoginUser, fetchRegisterUser } from '@/api/auth';
import { AuthorizationError, ValidationError } from '@/utils/errors';
import { showError } from '@/utils/messages';
import { getItemFromStorage, removeItemFromStorage, setItemToStorage } from '@/utils/storage';
import { createAction } from '@/utils/vuexHelpers';

import {
  clearAuthorization,
  authorizationRequest,
  authorizationSuccess,
  authorizationFailure,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
} from './mutations';

const AUTH_TOKEN = 'jwtToken';

const AUTH_ACTIONS = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  REGISTER: 'auth/register',
  GET_CURRENT_USER: 'auth/getCurrentUser',
};

export const actions = {
  [AUTH_ACTIONS.LOGIN]: async ({ commit }, action) => {
    try {
      commit(authorizationRequest());

      const { user } = await fetchLoginUser(action.payload);
      commit(authorizationSuccess(user));
      setItemToStorage(AUTH_TOKEN, user.token);
      setAxiosAuthorization(user.token);

      return user;
    } catch (error) {
      if (error instanceof ValidationError) {
        commit(authorizationFailure(error.errors));
      } else {
        showError(error.message);
        commit(authorizationFailure());
      }
    }
  },
  [AUTH_ACTIONS.REGISTER]: async ({ commit }, action) => {
    try {
      commit(authorizationRequest());

      const { user } = await fetchRegisterUser(action.payload);
      commit(authorizationSuccess(user));
      setItemToStorage(AUTH_TOKEN, user.token);
      setAxiosAuthorization(user.token);

      return user;
    } catch (error) {
      if (error instanceof ValidationError) {
        commit(authorizationFailure(error.errors));
      } else {
        showError(error.message);
        commit(authorizationFailure());
      }
    }
  },
  [AUTH_ACTIONS.GET_CURRENT_USER]: async ({ commit }) => {
    const token = getItemFromStorage(AUTH_TOKEN);

    if (!token) {
      commit(getCurrentUserFailure());
      return;
    }

    try {
      commit(getCurrentUserRequest());
      setAxiosAuthorization(token);

      const { user } = await fetchGetCurrentUser();
      commit(getCurrentUserSuccess(user));

      return user;
    } catch (error) {
      if (error instanceof AuthorizationError) {
        clearAxiosAuthorization();
        removeItemFromStorage(AUTH_TOKEN);
      } else {
        showError(error.message);
      }

      commit(getCurrentUserFailure());
    }
  },
  [AUTH_ACTIONS.LOGOUT]: ({ commit }) => {
    commit(clearAuthorization());
    clearAxiosAuthorization();
    removeItemFromStorage(AUTH_TOKEN);
  },
};

export const loginUser = createAction(AUTH_ACTIONS.LOGIN);
export const logoutUser = createAction(AUTH_ACTIONS.LOGOUT);
export const registerUser = createAction(AUTH_ACTIONS.REGISTER);
export const getCurrentUser = createAction(AUTH_ACTIONS.GET_CURRENT_USER);
