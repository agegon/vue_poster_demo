import { createMutation } from '@/utils/vuexHelpers';

const ARTICLE_MUTATIONS = {
  GET_ARTICLE_REQUEST: 'currentArticle/getArticleRequest',
  GET_ARTICLE_SUCCESS: 'currentArticle/getArticleSuccess',
  GET_ARTICLE_FAILURE: 'currentArticle/getArticleFailure',

  SAVE_ARTICLE_REQUEST: 'currentArticle/saveArticleRequest',
  SAVE_ARTICLE_SUCCESS: 'currentArticle/saveArticleSuccess',
  SAVE_ARTICLE_FAILURE: 'currentArticle/saveArticleFailure',

  DELETE_ARTICLE_REQUEST: 'currentArticle/deleteArticleRequest',
  DELETE_ARTICLE_SUCCESS: 'currentArticle/deleteArticleSuccess',
  DELETE_ARTICLE_FAILURE: 'currentArticle/deleteArticleFailure',

  CLEAR_ARTICLE_STATE: 'currentArticle/clearArticleState',
};

export const mutations = {
  [ARTICLE_MUTATIONS.GET_ARTICLE_REQUEST]: (state) => {
    state.isLoading = true;
    state.error = null;
  },
  [ARTICLE_MUTATIONS.GET_ARTICLE_SUCCESS]: (state, mutation) => {
    state.data = mutation.payload.article;
    state.isLoading = false;
  },
  [ARTICLE_MUTATIONS.GET_ARTICLE_FAILURE]: (state, mutation) => {
    state.isLoading = false;
    state.error = mutation.payload || null;
  },
  [ARTICLE_MUTATIONS.SAVE_ARTICLE_REQUEST]: (state) => {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [ARTICLE_MUTATIONS.SAVE_ARTICLE_SUCCESS]: (state) => {
    state.isSubmitting = false;
  },
  [ARTICLE_MUTATIONS.SAVE_ARTICLE_FAILURE]: (state, mutation) => {
    state.isSubmitting = false;
    state.validationErrors = mutation.payload || null;
  },
  [ARTICLE_MUTATIONS.DELETE_ARTICLE_REQUEST]: (state) => {
    state.isDeleting = true;
  },
  [ARTICLE_MUTATIONS.DELETE_ARTICLE_SUCCESS]: (state) => {
    state.isDeleting = false;
  },
  [ARTICLE_MUTATIONS.DELETE_ARTICLE_FAILURE]: (state) => {
    state.isDeleting = false;
  },
  [ARTICLE_MUTATIONS.CLEAR_ARTICLE_STATE]: (state) => {
    state.data = null;
    state.error = null;
    state.isDeleting = false;
    state.isLoading = false;
    state.isSubmitting = false;
    state.validationErrors = null;
  },
};

export const getArticleRequest = createMutation(ARTICLE_MUTATIONS.GET_ARTICLE_REQUEST);
export const getArticleSuccess = createMutation(ARTICLE_MUTATIONS.GET_ARTICLE_SUCCESS);
export const getArticleFailure = createMutation(ARTICLE_MUTATIONS.GET_ARTICLE_FAILURE);

export const saveArticleRequest = createMutation(ARTICLE_MUTATIONS.SAVE_ARTICLE_REQUEST);
export const saveArticleSuccess = createMutation(ARTICLE_MUTATIONS.SAVE_ARTICLE_SUCCESS);
export const saveArticleFailure = createMutation(ARTICLE_MUTATIONS.SAVE_ARTICLE_FAILURE);

export const deleteArticleRequest = createMutation(ARTICLE_MUTATIONS.DELETE_ARTICLE_REQUEST);
export const deleteArticleSuccess = createMutation(ARTICLE_MUTATIONS.DELETE_ARTICLE_SUCCESS);
export const deleteArticleFailure = createMutation(ARTICLE_MUTATIONS.DELETE_ARTICLE_FAILURE);

export const clearArticleState = createMutation(ARTICLE_MUTATIONS.CLEAR_ARTICLE_STATE);
