import { AUTH_STATUSES } from '@/constants/auth';

export const AUTH_GETTERS = {
  CURRENT_USER: 'auth/currentUser',
  CURRENT_USERNAME: 'auth/currentUsername',
  IS_AUTHENTICATED: 'auth/isAuthenticated',
  IS_ANONYMOUS: 'auth/isAnonymous',
  IS_LOADING: 'auth/isLoading',
  IS_SUBMITTING: 'auth/isSubmitting',
  VALIDATION_ERRORS: 'auth/validationErrors',
};

export const getters = {
  [AUTH_GETTERS.CURRENT_USER]: (state) => state.currentUser,
  [AUTH_GETTERS.CURRENT_USERNAME]: (state) => state.currentUser?.username || null,
  [AUTH_GETTERS.IS_AUTHENTICATED]: (state) => state.status === AUTH_STATUSES.AUTHENTICATED,
  [AUTH_GETTERS.IS_ANONYMOUS]: (state) => state.status === AUTH_STATUSES.NOT_AUTHENTICATED,
  [AUTH_GETTERS.IS_LOADING]: (state) => state.isLoading,
  [AUTH_GETTERS.IS_SUBMITTING]: (state) => state.isSubmitting,
  [AUTH_GETTERS.VALIDATION_ERRORS]: (state) => state.validationErrors,
};
