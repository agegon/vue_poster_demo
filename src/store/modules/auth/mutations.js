import { AUTH_STATUSES } from '@/constants/auth';
import { createMutation } from '@/utils/vuexHelpers';

const AUTH_MUTATIONS = {
  REGISTER_REQUEST: 'auth/registerRequest',
  REGISTER_SUCCESS: 'auth/registerSuccess',
  REGISTER_FAILURE: 'auth/registerFailure',
};

export const mutations = {
  [AUTH_MUTATIONS.REGISTER_REQUEST]: (state) => {
    state.isSubmitting = true;
    state.error = null;
    state.validationErrors = null;
  },
  [AUTH_MUTATIONS.REGISTER_SUCCESS]: (state, mutation) => {
    state.isSubmitting = false;
    state.currentUser = mutation.payload;
    state.status = AUTH_STATUSES.AUTHENTICATED;
  },
  [AUTH_MUTATIONS.REGISTER_FAILURE]: (state, mutation) => {
    const { error, validationErrors } = mutation.payload;

    state.isSubmitting = false;
    state.error = error || null;
    state.validationErrors = validationErrors || null;
    state.status = AUTH_STATUSES.NOT_AUTHENTICATED;
  },
};

export const authRegisterRequest = createMutation(AUTH_MUTATIONS.REGISTER_REQUEST);
export const authRegisterSuccess = createMutation(AUTH_MUTATIONS.REGISTER_SUCCESS);
export const authRegisterFailure = createMutation(AUTH_MUTATIONS.REGISTER_FAILURE);
