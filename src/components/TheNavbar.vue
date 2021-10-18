<template>
  <nav class="navbar">
    <app-container>
      <el-row class="header" justify="space-between" align="middle">
        <router-link class="link brand-link" :to="{ name: 'home' }">
          <h3 class="title">Poster</h3>
        </router-link>

        <ul class="ma-0 pa-0 link-list">
          <template v-if="isAuth">
            <li class="ml-2">
              <router-link
                class="link nav-link"
                active-class="active"
                exact
                :to="{ name: 'createArticle' }"
              >
                <i class="icon"><icon-edit /></i>
                &nbsp;New Article
              </router-link>
            </li>
            <li class="ml-2">
              <router-link
                class="link nav-link"
                active-class="active"
                exact
                :to="{ name: 'settings' }"
              >
                <i class="icon"><icon-settings /></i>
                &nbsp;Settings
              </router-link>
            </li>
            <li class="ml-2">
              <router-link
                class="link nav-link"
                active-class="active"
                exact
                :to="{
                  name: 'userProfile',
                  params: { username: currentUser.username },
                }"
              >
                <el-avatar
                  icon="el-icon-user-solid"
                  :src="currentUser.image"
                  :size="24"
                ></el-avatar>
                <span class="username">&nbsp;{{ currentUser.username }}</span>
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="ml-2">
              <router-link
                class="link nav-link"
                active-class="active"
                exact
                :to="{ name: 'login' }"
              >
                Sing In
              </router-link>
            </li>
            <li class="ml-2">
              <router-link
                class="link nav-link"
                active-class="active"
                exact
                :to="{ name: 'register' }"
              >
                Sing Up
              </router-link>
            </li>
          </template>
        </ul>
      </el-row>
    </app-container>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElAvatar, ElRow } from 'element-plus';
import { IconEdit, IconSettings } from '@/components/icons';
import AppContainer from '@/components/ui/AppContainer';
import { AUTH_GETTERS } from '@/store/modules/auth';

export default {
  name: 'TheNavbar',
  computed: mapGetters({
    currentUser: AUTH_GETTERS.CURRENT_USER,
    isAuth: AUTH_GETTERS.IS_AUTHENTICATED,
  }),
  components: {
    AppContainer,
    ElAvatar,
    ElRow,
    IconEdit,
    IconSettings,
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background: white;
  box-shadow: 0px 2px 8px 0px rgba(34, 60, 80, 0.2);
}

.header {
  min-height: 30px;
}

.title {
  color: var(--el-color-primary);
}

.link-list {
  align-items: center;
  display: flex;
  list-style: none;
}

.link.brand-link {
  text-decoration: none;
}

.link.nav-link {
  align-items: center;
  display: inline-flex;
  text-decoration: none;
}

.nav-link.active {
  color: #000;
}

.username {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
