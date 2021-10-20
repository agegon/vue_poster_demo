import { createMutation } from '@/utils/vuexHelpers';

const PROFILE_MUTATIONS = {
  GET_PROFILE_REQUEST: 'currentProfile/getProfileRequest',
  GET_PROFILE_SUCCESS: 'currentProfile/getProfileSuccess',
  GET_PROFILE_FAILURE: 'currentProfile/getProfileFailure',

  CLEAR_PROFILE_STATE: 'currentProfile/clearProfileState',
  SET_PROFILE_FOLLOW: 'currentProfile/setProfileFollow',
};

export const mutations = {
  [PROFILE_MUTATIONS.GET_PROFILE_REQUEST]: (state) => {
    state.isLoading = true;
    state.error = null;
  },
  [PROFILE_MUTATIONS.GET_PROFILE_SUCCESS]: (state, mutation) => {
    state.data = mutation.payload.profile;
    state.isLoading = false;
  },
  [PROFILE_MUTATIONS.GET_PROFILE_FAILURE]: (state, mutation) => {
    state.isLoading = false;
    state.error = mutation.payload || null;
  },
  [PROFILE_MUTATIONS.CLEAR_PROFILE_STATE]: (state) => {
    state.data = null;
    state.error = null;
    state.isLoading = false;
  },
  [PROFILE_MUTATIONS.SET_PROFILE_FOLLOW]: (state, mutation) => {
    state.data = {
      ...state.data,
      following: mutation.payload,
    };
  },
};

export const getProfileRequest = createMutation(PROFILE_MUTATIONS.GET_PROFILE_REQUEST);
export const getProfileSuccess = createMutation(PROFILE_MUTATIONS.GET_PROFILE_SUCCESS);
export const getProfileFailure = createMutation(PROFILE_MUTATIONS.GET_PROFILE_FAILURE);

export const clearProfileState = createMutation(PROFILE_MUTATIONS.CLEAR_PROFILE_STATE);
export const setProfileFollow = createMutation(PROFILE_MUTATIONS.SET_PROFILE_FOLLOW);
