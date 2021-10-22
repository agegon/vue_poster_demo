import { createMutation } from '@/utils/vuexHelpers';

const ARTICLES_MUTATIONS = {
  GET_ARTICLES_REQUEST: 'articles/getArticlesRequest',
  GET_ARTICLES_SUCCESS: 'articles/getArticlesSuccess',
  GET_ARTICLES_FAILURE: 'articles/getArticlesFailure',
  SET_ARTICLE_FAVORITE: 'articles/setArticleFavorite',
};

export const mutations = {
  [ARTICLES_MUTATIONS.GET_ARTICLES_REQUEST]: (state) => {
    state.isLoading = true;
    state.error = null;
  },
  [ARTICLES_MUTATIONS.GET_ARTICLES_SUCCESS]: (state, mutation) => {
    state.count = mutation.payload.articlesCount;
    state.data = mutation.payload.articles;
    state.isLoading = false;
  },
  [ARTICLES_MUTATIONS.GET_ARTICLES_FAILURE]: (state, mutation) => {
    state.isLoading = false;
    state.error = mutation.payload || null;
  },
  [ARTICLES_MUTATIONS.SET_ARTICLE_FAVORITE]: (state, mutation) => {
    const { slug, favoritesCount, favorited } = mutation.payload;

    state.data = state.data.map((item) =>
      item.slug === slug ? { ...item, favorited, favoritesCount } : item,
    );
  },
};

export const getArticlesRequest = createMutation(ARTICLES_MUTATIONS.GET_ARTICLES_REQUEST);
export const getArticlesSuccess = createMutation(ARTICLES_MUTATIONS.GET_ARTICLES_SUCCESS);
export const getArticlesFailure = createMutation(ARTICLES_MUTATIONS.GET_ARTICLES_FAILURE);
export const setArticleFavorite = createMutation(ARTICLES_MUTATIONS.SET_ARTICLE_FAVORITE);
