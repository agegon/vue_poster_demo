import { AUTH_STATUSES } from '@/constants/auth';
import { createMutation } from '@/utils/vuexHelpers';

const AUTH_MUTATIONS = {
  AUTHORIZATION_REQUEST: 'auth/authorizationRequest',
  AUTHORIZATION_SUCCESS: 'auth/authorizationSuccess',
  AUTHORIZATION_FAILURE: 'auth/authorizationFailure',

  GET_CURRENT_USER_REQUEST: 'auth/getCurrentUserRequest',
  GET_CURRENT_USER_SUCCESS: 'auth/getCurrentUserSuccess',
  GET_CURRENT_USER_FAILURE: 'auth/getCurrentUserFailure',

  UPDATE_CURRENT_USER_REQUEST: 'auth/updateCurrentUserRequest',
  UPDATE_CURRENT_USER_SUCCESS: 'auth/updateCurrentUserSuccess',
  UPDATE_CURRENT_USER_FAILURE: 'auth/updateCurrentUserFailure',

  CLEAR_VALIDATION_ERRORS: 'auth/clearValidationErrors',
  CLEAR_AUTHORIZATION: 'auth/clearAuthorization',
};

export const mutations = {
  [AUTH_MUTATIONS.AUTHORIZATION_REQUEST]: (state) => {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AUTH_MUTATIONS.AUTHORIZATION_SUCCESS]: (state, mutation) => {
    state.isSubmitting = false;
    state.currentUser = mutation.payload;
    state.status = AUTH_STATUSES.AUTHENTICATED;
  },
  [AUTH_MUTATIONS.AUTHORIZATION_FAILURE]: (state, mutation) => {
    state.isSubmitting = false;
    state.validationErrors = mutation.payload || null;
    state.status = AUTH_STATUSES.NOT_AUTHENTICATED;
  },
  [AUTH_MUTATIONS.GET_CURRENT_USER_REQUEST]: (state) => {
    state.isLoading = true;
  },
  [AUTH_MUTATIONS.GET_CURRENT_USER_SUCCESS]: (state, mutation) => {
    state.isLoading = false;
    state.currentUser = mutation.payload;
    state.status = AUTH_STATUSES.AUTHENTICATED;
  },
  [AUTH_MUTATIONS.GET_CURRENT_USER_FAILURE]: (state) => {
    state.isLoading = false;
    state.status = AUTH_STATUSES.NOT_AUTHENTICATED;
  },
  [AUTH_MUTATIONS.UPDATE_CURRENT_USER_REQUEST]: (state) => {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AUTH_MUTATIONS.UPDATE_CURRENT_USER_SUCCESS]: (state, mutation) => {
    state.isSubmitting = false;
    state.currentUser = mutation.payload;
  },
  [AUTH_MUTATIONS.UPDATE_CURRENT_USER_FAILURE]: (state, mutation) => {
    state.isSubmitting = false;
    state.validationErrors = mutation.payload || null;
  },
  [AUTH_MUTATIONS.CLEAR_VALIDATION_ERRORS]: (state) => {
    state.validationErrors = null;
  },
  [AUTH_MUTATIONS.CLEAR_AUTHORIZATION]: (state) => {
    state.isSubmitting = false;
    state.isLoading = false;
    state.validationErrors = null;
    state.status = AUTH_STATUSES.NOT_AUTHENTICATED;
    state.currentUser = null;
  },
};

export const authorizationRequest = createMutation(AUTH_MUTATIONS.AUTHORIZATION_REQUEST);
export const authorizationSuccess = createMutation(AUTH_MUTATIONS.AUTHORIZATION_SUCCESS);
export const authorizationFailure = createMutation(AUTH_MUTATIONS.AUTHORIZATION_FAILURE);

export const getCurrentUserRequest = createMutation(AUTH_MUTATIONS.GET_CURRENT_USER_REQUEST);
export const getCurrentUserSuccess = createMutation(AUTH_MUTATIONS.GET_CURRENT_USER_SUCCESS);
export const getCurrentUserFailure = createMutation(AUTH_MUTATIONS.GET_CURRENT_USER_FAILURE);

export const updateCurrentUserRequest = createMutation(AUTH_MUTATIONS.UPDATE_CURRENT_USER_REQUEST);
export const updateCurrentUserSuccess = createMutation(AUTH_MUTATIONS.UPDATE_CURRENT_USER_SUCCESS);
export const updateCurrentUserFailure = createMutation(AUTH_MUTATIONS.UPDATE_CURRENT_USER_FAILURE);

export const clearValidationErrors = createMutation(AUTH_MUTATIONS.CLEAR_VALIDATION_ERRORS);
export const clearAuthorization = createMutation(AUTH_MUTATIONS.CLEAR_AUTHORIZATION);
