export const ARTICLES_GETTERS = {
  ARTICLES_COUNT: 'articles/articlesCount',
  ARTICLES_DATA: 'articles/articlesData',
  ERROR: 'articles/error',
  IS_LOADING: 'articles/isLoading',
};

export const getters = {
  [ARTICLES_GETTERS.ARTICLES_COUNT]: (state) => state.count,
  [ARTICLES_GETTERS.ARTICLES_DATA]: (state) => state.data,
  [ARTICLES_GETTERS.ERROR]: (state) => state.error,
  [ARTICLES_GETTERS.IS_LOADING]: (state) => state.isLoading,
};
