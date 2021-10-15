<template>
  <el-row justify="space-between" align="middle">
    <h3 class="title">Poster</h3>
    <ul class="link-list">
      <li class="ml-2">
        <router-link class="link nav-link" :to="{ name: 'home' }">Home</router-link>
      </li>
      <li class="ml-2">
        <router-link class="link nav-link" :to="{ name: 'login' }">Sing In</router-link>
      </li>
      <li class="ml-2">
        <router-link class="link nav-link" :to="{ name: 'register' }">Sing Up</router-link>
      </li>
    </ul>
  </el-row>
</template>

<script>
import { ElRow } from 'element-plus';

export default {
  name: 'TheNavbar',
  components: {
    ElRow,
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: var(--el-color-primary);
  cursor: default;
}

.link-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link.active {
  color: #000;
  text-decoration: none;
}
</style>
