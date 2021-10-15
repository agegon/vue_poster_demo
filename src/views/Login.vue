<template>
  <app-auth-layout title="Sign In">
    <template #link>
      <router-link class="link link--primary" :to="{ name: 'register' }"
        >Need an account?</router-link
      >
    </template>
    <el-card>
      <form>
        <div class="form-control mb-2">
          <label for="username">Username:</label>
          <el-input id="username" name="username" placeholder="Username" type="text"></el-input>
        </div>
        <div class="form-control mb-2">
          <label for="password">Password:</label>
          <el-input id="password" name="password" placeholder="Password" type="text"></el-input>
        </div>
        <el-row justify="end">
          <el-button type="primary" native-type="submit">Sign In</el-button>
        </el-row>
      </form>
    </el-card>
  </app-auth-layout>
</template>

<script>
import { ElRow, ElCard, ElInput, ElButton } from 'element-plus';
import AppAuthLayout from '@/layouts/AppAuthLayout';

export default {
  name: 'AppLogin',
  components: {
    AppAuthLayout,
    ElRow,
    ElCard,
    ElInput,
    ElButton,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

p {
  text-align: center;
}
</style>
