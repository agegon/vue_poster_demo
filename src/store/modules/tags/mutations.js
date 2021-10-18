import { createMutation } from '@/utils/vuexHelpers';

const TAGS_MUTATIONS = {
  GET_TAGS_REQUEST: 'tags/getTagsRequest',
  GET_TAGS_SUCCESS: 'tags/getTagsSuccess',
  GET_TAGS_FAILURE: 'tags/getTagsFailure',
};

export const mutations = {
  [TAGS_MUTATIONS.GET_TAGS_REQUEST]: (state) => {
    state.isLoading = true;
    state.error = null;
  },
  [TAGS_MUTATIONS.GET_TAGS_SUCCESS]: (state, mutation) => {
    state.data = mutation.payload.tags;
    state.isLoading = false;
  },
  [TAGS_MUTATIONS.GET_TAGS_FAILURE]: (state, mutation) => {
    state.isLoading = false;
    state.error = mutation.payload || null;
  },
};

export const getTagsRequest = createMutation(TAGS_MUTATIONS.GET_TAGS_REQUEST);
export const getTagsSuccess = createMutation(TAGS_MUTATIONS.GET_TAGS_SUCCESS);
export const getTagsFailure = createMutation(TAGS_MUTATIONS.GET_TAGS_FAILURE);
