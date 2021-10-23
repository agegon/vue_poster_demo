export const COMMENTS_GETTERS = {
  DATA: 'comments/data',
  IS_CREATING: 'comments/isCreating',
  IS_DELETING: 'comments/isDeleting',
  IS_LOADING: 'comments/isLoading',
  ERROR: 'comments/error',
  VALIDATION_ERRORS: 'comments/validationErrors',
};

export const getters = {
  [COMMENTS_GETTERS.DATA]: (state) => state.data,
  [COMMENTS_GETTERS.IS_CREATING]: (state) => state.isCreating,
  [COMMENTS_GETTERS.IS_DELETING]: (state) => state.isDeleting,
  [COMMENTS_GETTERS.IS_LOADING]: (state) => state.isLoading,
  [COMMENTS_GETTERS.ERROR]: (state) => state.error,
  [COMMENTS_GETTERS.VALIDATION_ERRORS]: (state) => state.validationErrors,
};
