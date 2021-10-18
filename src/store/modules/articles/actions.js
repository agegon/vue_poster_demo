import { fetchGetArticles, fetchGetFeedArticles } from '@/api/articles';
import { showError } from '@/utils/messages';
import { createAction } from '@/utils/vuexHelpers';

import { getArticlesFailure, getArticlesRequest, getArticlesSuccess } from './mutations';

const ARTICLES_ACTIONS = {
  GET_ARTICLES: 'articles/getArticles',
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
      commit(getArticlesFailure(error.message));
    }
  },
};

export const getArticles = createAction(ARTICLES_ACTIONS.GET_ARTICLES);
