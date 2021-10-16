<template>
  <app-layout v-if="!isLoading">
    <template #header>
      <the-navbar></the-navbar>
    </template>
    <router-view></router-view>
  </app-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import TheNavbar from '@/components/TheNavbar.vue';
import AppLayout from '@/layouts/AppLayout';
import { protectRoute } from '@/router/routeGuard';
import { AUTH_GETTERS, getCurrentUser } from '@/store/modules/auth';

export default {
  name: 'App',
  computed: mapGetters({
    isLoading: AUTH_GETTERS.IS_LOADING,
  }),
  mounted() {
    this.$store.dispatch(getCurrentUser()).then(() => {
      const redirectRoute = protectRoute(this.$route);

      if (redirectRoute) {
        this.$router.push(redirectRoute);
      }
    });
  },
  components: {
    AppLayout,
    TheNavbar,
  },
};
</script>

<style lang="scss">
html {
  height: 100%;
}

body {
  background-color: var(--el-background-color-base);
  font-family: sans-serif;
  margin: 0;
  min-height: 100%;
  position: relative;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
</style>
