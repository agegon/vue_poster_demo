export const CURRENT_PROFILE_GETTERS = {
  DATA: 'currentProfile/data',
  ERROR: 'currentProfile/error',
  IS_LOADING: 'currentProfile/isLoading',
};

export const getters = {
  [CURRENT_PROFILE_GETTERS.DATA]: (state) => state.data,
  [CURRENT_PROFILE_GETTERS.ERROR]: (state) => state.error,
  [CURRENT_PROFILE_GETTERS.IS_LOADING]: (state) => state.isLoading,
};
