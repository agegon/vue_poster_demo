import { fetchCreateComment, fetchDeleteComment, fetchGetComments } from '@/api/comments';
import { ValidationError } from '@/utils/errors';
import { showError } from '@/utils/messages';
import { createAction } from '@/utils/vuexHelpers';

import {
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,
  deleteCommentFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  getCommentsFailure,
  getCommentsRequest,
  getCommentsSuccess,
} from './mutations';

const COMMENTS_ACTIONS = {
  GET_COMMENTS: 'comments/getComments',
  CREATE_COMMENT: 'comments/createComment',
  DELETE_COMMENT: 'comments/deleteComment',
};

export const actions = {
  [COMMENTS_ACTIONS.GET_COMMENTS]: async ({ commit }, action) => {
    try {
      commit(getCommentsRequest());

      const data = await fetchGetComments(action.payload);
      commit(getCommentsSuccess(data.comments));

      return data;
    } catch (error) {
      showError(error.message);
      commit(getCommentsFailure(error.name));
    }
  },
  [COMMENTS_ACTIONS.CREATE_COMMENT]: async ({ commit }, action) => {
    try {
      commit(createCommentRequest());

      const { slug, comment } = action.payload;
      const data = await fetchCreateComment(slug, { comment });
      commit(createCommentSuccess(data.comment));

      return data;
    } catch (error) {
      if (error instanceof ValidationError) {
        commit(createCommentFailure(error.errors));
      } else {
        showError(error.message);
        commit(createCommentFailure());
      }
    }
  },
  [COMMENTS_ACTIONS.DELETE_COMMENT]: async ({ commit }, action) => {
    try {
      commit(deleteCommentRequest());

      const { slug, id } = action.payload;
      await fetchDeleteComment(slug, id);
      commit(deleteCommentSuccess(id));

      return true;
    } catch (error) {
      showError(error.message);
      commit(deleteCommentFailure());
    }
  },
};

export const getComments = createAction(COMMENTS_ACTIONS.GET_COMMENTS);
export const createComment = createAction(COMMENTS_ACTIONS.CREATE_COMMENT);
export const deleteComment = createAction(COMMENTS_ACTIONS.DELETE_COMMENT);
