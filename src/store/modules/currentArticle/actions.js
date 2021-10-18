import {
  fetchGetArticle,
  fetchCreateArticle,
  fetchUpdateArticle,
  fetchDeleteArticle,
} from '@/api/articles';
import { ValidationError } from '@/utils/errors';
import { showError } from '@/utils/messages';
import { createAction } from '@/utils/vuexHelpers';
import {
  deleteArticleFailure,
  deleteArticleRequest,
  deleteArticleSuccess,
  getArticleFailure,
  getArticleRequest,
  getArticleSuccess,
  saveArticleFailure,
  saveArticleRequest,
  saveArticleSuccess,
} from './mutations';

const ARTICLE_ACTIONS = {
  GET_ARTICLE: 'articles/getArticle',
  CREATE_ARTICLE: 'articles/createArticle',
  UPDATE_ARTICLE: 'articles/updateArticle',
  DELETE_ARTICLE: 'articles/deleteArticle',
};

export const actions = {
  [ARTICLE_ACTIONS.GET_ARTICLE]: async ({ commit }, action) => {
    try {
      commit(getArticleRequest());

      const data = await fetchGetArticle(action.payload);
      commit(getArticleSuccess(data));

      return data;
    } catch (error) {
      showError(error.message);
      commit(getArticleFailure(error.message));
    }
  },
  [ARTICLE_ACTIONS.CREATE_ARTICLE]: async ({ commit }, action) => {
    try {
      commit(saveArticleRequest());

      const data = await fetchCreateArticle(action.payload);
      commit(saveArticleSuccess());

      return data;
    } catch (error) {
      if (error instanceof ValidationError) {
        commit(saveArticleFailure(error.errors));
      } else {
        showError(error.message);
        commit(saveArticleFailure());
      }
    }
  },
  [ARTICLE_ACTIONS.UPDATE_ARTICLE]: async ({ commit }, action) => {
    try {
      commit(saveArticleRequest());

      const { slug, ...body } = action;
      const data = await fetchUpdateArticle(slug, body);
      commit(saveArticleSuccess());

      return data;
    } catch (error) {
      if (error instanceof ValidationError) {
        commit(saveArticleFailure(error.errors));
      } else {
        showError(error.message);
        commit(saveArticleFailure());
      }
    }
  },
  [ARTICLE_ACTIONS.DELETE_ARTICLE]: async ({ commit }, action) => {
    try {
      commit(deleteArticleRequest());

      const data = await fetchDeleteArticle(action.payload);
      commit(deleteArticleSuccess());

      return data;
    } catch (error) {
      showError(error.message);
      commit(deleteArticleFailure());
    }
  },
};

export const getArticle = createAction(ARTICLE_ACTIONS.GET_ARTICLE);
export const createArticle = createAction(ARTICLE_ACTIONS.CREATE_ARTICLE);
export const updateArticle = createAction(ARTICLE_ACTIONS.UPDATE_ARTICLE);
export const deleteArticle = createAction(ARTICLE_ACTIONS.DELETE_ARTICLE);
