export const CURRENT_ARTICLE_GETTERS = {
  DATA: 'currentArticle/data',
  ERROR: 'currentArticle/error',
  IS_DELETING: 'currentArticle/isDeleting',
  IS_LOADING: 'currentArticle/isLoading',
  IS_SUBMITTING: 'currentArticles/isSubmitting',
  VALIDATION_ERRORS: 'currentArticle/validationErrors',
};

export const getters = {
  [CURRENT_ARTICLE_GETTERS.DATA]: (state) => state.data,
  [CURRENT_ARTICLE_GETTERS.ERROR]: (state) => state.error,
  [CURRENT_ARTICLE_GETTERS.IS_DELETING]: (state) => state.isDeleting,
  [CURRENT_ARTICLE_GETTERS.IS_LOADING]: (state) => state.isLoading,
  [CURRENT_ARTICLE_GETTERS.IS_SUBMITTING]: (state) => state.isSubmitting,
  [CURRENT_ARTICLE_GETTERS.VALIDATION_ERRORS]: (state) => state.validationErrors,
};
