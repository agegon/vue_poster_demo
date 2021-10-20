import { fetchFollowProfile, fetchGetProfile, fetchUnfollowProfile } from '@/api/profiles';
import { showError } from '@/utils/messages';
import { createAction } from '@/utils/vuexHelpers';
import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  setProfileFollow,
} from './mutations';

const PROFILE_ACTIONS = {
  GET_PROFILE: 'profile/getProfile',
  FOLLOW_PROFILE: 'profile/followProfile',
  UNFOLLOW_PROFILE: 'profile/unfollowProfile',
};

export const actions = {
  [PROFILE_ACTIONS.GET_PROFILE]: async ({ commit }, action) => {
    try {
      commit(getProfileRequest());

      const data = await fetchGetProfile(action.payload);
      commit(getProfileSuccess(data));

      return data;
    } catch (error) {
      showError(error.message);
      commit(getProfileFailure(error.name));
    }
  },
  [PROFILE_ACTIONS.FOLLOW_PROFILE]: async ({ commit }, action) => {
    try {
      const data = await fetchFollowProfile(action.payload);
      commit(setProfileFollow(true));

      return data;
    } catch (error) {
      showError(error.message);
    }
  },
  [PROFILE_ACTIONS.UNFOLLOW_PROFILE]: async ({ commit }, action) => {
    try {
      const data = await fetchUnfollowProfile(action.payload);
      commit(setProfileFollow(false));

      return data;
    } catch (error) {
      showError(error.message);
    }
  },
};

export const getProfile = createAction(PROFILE_ACTIONS.GET_PROFILE);
export const followProfile = createAction(PROFILE_ACTIONS.FOLLOW_PROFILE);
export const unfollowProfile = createAction(PROFILE_ACTIONS.UNFOLLOW_PROFILE);
