import { createMutation } from '@/utils/vuexHelpers';

const COMMENTS_MUTATIONS = {
  GET_COMMENTS_REQUEST: 'comments/getCommentsRequest',
  GET_COMMENTS_SUCCESS: 'comments/getCommentsSuccess',
  GET_COMMENTS_FAILURE: 'comments/getCommentsFailure',

  CREATE_COMMENT_REQUEST: 'comments/createCommentRequest',
  CREATE_COMMENT_SUCCESS: 'comments/createCommentSuccess',
  CREATE_COMMENT_FAILURE: 'comments/createCommentFailure',

  DELETE_COMMENT_REQUEST: 'comments/deleteCommentRequest',
  DELETE_COMMENT_SUCCESS: 'comments/deleteCommentSuccess',
  DELETE_COMMENT_FAILURE: 'comments/deleteCommentFailure',

  CLEAR_COMMENTS_STATE: 'comments/clearCommentsState',
};

export const mutations = {
  [COMMENTS_MUTATIONS.GET_COMMENTS_REQUEST]: (state) => {
    state.isLoading = true;
    state.error = null;
  },
  [COMMENTS_MUTATIONS.GET_COMMENTS_SUCCESS]: (state, mutation) => {
    state.isLoading = false;
    state.data = mutation.payload;
  },
  [COMMENTS_MUTATIONS.GET_COMMENTS_FAILURE]: (state, mutation) => {
    state.isLoading = false;
    state.error = mutation.payload;
  },
  [COMMENTS_MUTATIONS.CREATE_COMMENT_REQUEST]: (state) => {
    state.isCreating = true;
    state.validationErrors = null;
  },
  [COMMENTS_MUTATIONS.CREATE_COMMENT_SUCCESS]: (state, mutation) => {
    state.isCreating = false;
    state.data.push(mutation.payload);
  },
  [COMMENTS_MUTATIONS.CREATE_COMMENT_FAILURE]: (state, mutation) => {
    state.isCreating = false;
    state.validationErrors = mutation.payload;
  },
  [COMMENTS_MUTATIONS.DELETE_COMMENT_REQUEST]: (state) => {
    state.isDeleting = true;
  },
  [COMMENTS_MUTATIONS.DELETE_COMMENT_SUCCESS]: (state, mutation) => {
    state.isDeleting = false;
    state.data = state.data.filter((item) => item.id !== mutation.payload);
  },
  [COMMENTS_MUTATIONS.DELETE_COMMENT_FAILURE]: (state) => {
    state.isDeleting = false;
  },
  [COMMENTS_MUTATIONS.CLEAR_COMMENTS_STATE]: (state) => {
    state.data = [];
    state.error = null;
    state.isCreating = false;
    state.isDeleting = false;
    state.isLoading = false;
    state.validationErrors = null;
  },
};

export const getCommentsRequest = createMutation(COMMENTS_MUTATIONS.GET_COMMENTS_REQUEST);
export const getCommentsSuccess = createMutation(COMMENTS_MUTATIONS.GET_COMMENTS_SUCCESS);
export const getCommentsFailure = createMutation(COMMENTS_MUTATIONS.GET_COMMENTS_FAILURE);

export const createCommentRequest = createMutation(COMMENTS_MUTATIONS.CREATE_COMMENT_REQUEST);
export const createCommentSuccess = createMutation(COMMENTS_MUTATIONS.CREATE_COMMENT_SUCCESS);
export const createCommentFailure = createMutation(COMMENTS_MUTATIONS.CREATE_COMMENT_FAILURE);

export const deleteCommentRequest = createMutation(COMMENTS_MUTATIONS.DELETE_COMMENT_REQUEST);
export const deleteCommentSuccess = createMutation(COMMENTS_MUTATIONS.DELETE_COMMENT_SUCCESS);
export const deleteCommentFailure = createMutation(COMMENTS_MUTATIONS.DELETE_COMMENT_FAILURE);

export const clearCommentsState = createMutation(COMMENTS_MUTATIONS.CLEAR_COMMENTS_STATE);
