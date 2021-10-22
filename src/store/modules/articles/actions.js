import {
  fetchGetArticles,
  fetchGetFeedArticles,
  fetchAddArticleToFavorite,
  fetchRemoveArticleFromFavorite,
} from '@/api/articles';
import { showError } from '@/utils/messages';
import { createAction } from '@/utils/vuexHelpers';

import {
  getArticlesFailure,
  getArticlesRequest,
  getArticlesSuccess,
  setArticleFavorite,
} from './mutations';

const ARTICLES_ACTIONS = {
  GET_ARTICLES: 'articles/getArticles',
  ADD_TO_FAVORITE: 'articles/addToFavorite',
  REMOVE_FROM_FAVORITE: 'articles/removeFromFavorite',
};

export const actions = {
  [ARTICLES_ACTIONS.GET_ARTICLES]: async ({ commit }, action) => {
    try {
      commit(getArticlesRequest());

      const { isFeed, ...params } = action.payload;

      const fetchPromise = isFeed ? fetchGetFeedArticles(params) : fetchGetArticles(params);
      const data = await fetchPromise;
      commit(getArticlesSuccess(data));

      return data;
    } catch (error) {
      showError(error.message);
      commit(getArticlesFailure(error.name));
    }
  },
  [ARTICLES_ACTIONS.ADD_TO_FAVORITE]: async ({ commit }, action) => {
    try {
      const data = await fetchAddArticleToFavorite(action.payload);
      commit(setArticleFavorite(data.article));

      return data;
    } catch (error) {
      showError(error.message);
    }
  },
  [ARTICLES_ACTIONS.REMOVE_FROM_FAVORITE]: async ({ commit }, action) => {
    try {
      const data = await fetchRemoveArticleFromFavorite(action.payload);
      commit(setArticleFavorite(data.article));

      return data;
    } catch (error) {
      showError(error.message);
    }
  },
};

export const getArticles = createAction(ARTICLES_ACTIONS.GET_ARTICLES);
export const addArticleToFavorite = createAction(ARTICLES_ACTIONS.ADD_TO_FAVORITE);
export const removeArticleFromFavorite = createAction(ARTICLES_ACTIONS.REMOVE_FROM_FAVORITE);
