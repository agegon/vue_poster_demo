<template>
  <app-layout>
    <template #header>
      <the-navbar></the-navbar>
    </template>
    <router-view></router-view>
  </app-layout>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';
import AppLayout from '@/layouts/AppLayout';

export default {
  name: 'App',
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
