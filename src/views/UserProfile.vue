<template>
  <app-loader v-if="isLoading" class="my-4"></app-loader>
  <app-error v-else-if="!profile" :error="error"></app-error>
  <template v-else>
    <app-banner type="warning">
      <div class="wrapper">
        <el-avatar
          class="avatar mb-2"
          icon="el-icon-user-solid"
          :src="profile.image"
          :size="100"
        ></el-avatar>
        <h2>{{ profile.username }}</h2>
      </div>
      <el-row v-if="isAuth" justify="end" align="bottom">
        <div v-if="isCurrentUser" class="buttons">
          <router-link :to="{ name: 'settings' }" v-slot="{ navigate }" custom>
            <el-button icon="el-icon-setting" type="success" size="mini" @click="navigate">
              Settings
            </el-button>
          </router-link>
          <el-button icon="el-icon-lock" type="danger" size="mini" @click="handleLogout">
            Logout
          </el-button>
        </div>
        <div v-else class="buttons">
          <el-button
            :icon="profile.following ? 'el-icon-star-on' : 'el-icon-star-off'"
            :plain="!profile.following"
            type="warning"
            size="mini"
            @click="updateFollowStatus"
          >
            {{ profile.following ? 'Unfollow' : 'Follow' }}
          </el-button>
        </div>
      </el-row>
    </app-banner>
    <app-container>
      <el-row justify="center">
        <el-col :xs="24" :lg="16">
          <el-tabs v-model="currentTab">
            <el-tab-pane
              :label="isCurrentUser ? 'My articles' : 'Articles'"
              :name="articleTabs.GLOBAL"
            ></el-tab-pane>
            <el-tab-pane label="Favorited" :name="articleTabs.FAVORITE"></el-tab-pane>
          </el-tabs>
          <app-articles :author="profile.username" :type="currentTab"></app-articles>
        </el-col>
      </el-row>
    </app-container>
  </template>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElAvatar, ElButton, ElCol, ElRow, ElTabs, ElTabPane } from 'element-plus';
import AppLoader from '@/components/ui/AppLoader';
import AppError from '@/components/AppError';
import AppBanner from '@/components/AppBanner';
import AppArticles from '@/components/AppArticles';
import AppContainer from '@/components/ui/AppContainer';
import { AUTH_GETTERS, logoutUser } from '@/store/modules/auth';
import {
  clearProfileState,
  CURRENT_PROFILE_GETTERS,
  followProfile,
  getProfile,
  unfollowProfile,
} from '@/store/modules/currentProfile';
import { ARTICLE_LIST_TYPES } from '@/constants/articles';

export default {
  name: 'AppUserProfile',
  data() {
    return {
      articleTabs: ARTICLE_LIST_TYPES,
      currentTab: ARTICLE_LIST_TYPES.GLOBAL,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: AUTH_GETTERS.CURRENT_USERNAME,
      profile: CURRENT_PROFILE_GETTERS.DATA,
      isAuth: AUTH_GETTERS.IS_AUTHENTICATED,
      isLoading: CURRENT_PROFILE_GETTERS.IS_LOADING,
      error: CURRENT_PROFILE_GETTERS.ERROR,
    }),
    isCurrentUser() {
      return this.profile.username === this.currentUser;
    },
  },
  methods: {
    async fetchProfile() {
      const username = this.$route.params.username;
      const data = await this.$store.dispatch(getProfile(username));

      document.title = data
        ? data.profile.username + ' - user profile | Poster'
        : this.$route.meta.title;
    },
    handleLogout() {
      this.$store.dispatch(logoutUser());
    },
    async updateFollowStatus() {
      const username = this.$route.params.username;

      if (this.profile.following) {
        await this.$store.dispatch(unfollowProfile(username));
      } else {
        await this.$store.dispatch(followProfile(username));
      }
    },
  },
  mounted() {
    this.fetchProfile();
  },
  beforeUnmount() {
    this.$store.commit(clearProfileState());
  },
  components: {
    AppArticles,
    AppBanner,
    AppContainer,
    AppError,
    AppLoader,
    ElAvatar,
    ElButton,
    ElCol,
    ElRow,
    ElTabs,
    ElTabPane,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  display: block;
  font-size: 4rem;
}

h2 {
  margin: 0 auto;
}

.buttons button {
  min-width: 100px;
}
</style>
