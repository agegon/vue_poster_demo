export const TAGS_GETTERS = {
  DATA: 'tags/data',
  ERROR: 'tags/error',
  IS_LOADING: 'tags/isLoading',
};

export const getters = {
  [TAGS_GETTERS.DATA]: (state) => state.data,
  [TAGS_GETTERS.ERROR]: (state) => state.error,
  [TAGS_GETTERS.IS_LOADING]: (state) => state.isLoading,
};
