import { fetchGetTags } from '@/api/tags';
import { showError } from '@/utils/messages';
import { createAction } from '@/utils/vuexHelpers';

import { getTagsFailure, getTagsRequest, getTagsSuccess } from './mutations';

const TAGS_ACTIONS = {
  GET_TAGS: 'tags/getTags',
};

export const actions = {
  [TAGS_ACTIONS.GET_TAGS]: async ({ commit }) => {
    try {
      commit(getTagsRequest());

      const data = await fetchGetTags();
      commit(getTagsSuccess(data));

      return data;
    } catch (error) {
      showError(error.message);
      commit(getTagsFailure(error.message));
    }
  },
};

export const getTags = createAction(TAGS_ACTIONS.GET_TAGS);
