<template>
  <app-auth-layout title="Sign Up">
    <template #link>
      <router-link class="link link--primary" :to="{ name: 'login' }">Have an account?</router-link>
    </template>
    <div v-if="validationErrors" class="mb-2">
      <app-validation-errors :errors="validationErrors"></app-validation-errors>
    </div>
    <el-card>
      <form @submit.prevent="handleSubmit">
        <div class="form-control mb-2">
          <label for="username">Username:</label>
          <el-input
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            v-model="username"
            :disabled="isSubmitting"
          ></el-input>
        </div>
        <div class="form-control mb-2">
          <label for="email">Email:</label>
          <el-input
            id="email"
            name="email"
            placeholder="Email"
            type="text"
            v-model="email"
            :disabled="isSubmitting"
          ></el-input>
        </div>
        <div class="form-control mb-2">
          <label for="password">Password:</label>
          <el-input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            v-model="password"
            :disabled="isSubmitting"
          ></el-input>
        </div>
        <el-row justify="end">
          <el-button type="primary" native-type="submit" :loading="isSubmitting">
            Sign Up
          </el-button>
        </el-row>
      </form>
    </el-card>
  </app-auth-layout>
</template>

<script>
import { ElRow, ElCard, ElInput, ElButton } from 'element-plus';
import AppAuthLayout from '@/layouts/AppAuthLayout';
import AppValidationErrors from '@/components/AppValidationErrors';
import { registerUser } from '@/store/modules/auth';

export default {
  name: 'AppRegister',
  data() {
    return {
      email: '',
      password: '',
      username: '',
    };
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    },
  },
  methods: {
    async handleSubmit() {
      const user = await this.$store.dispatch(
        registerUser({
          email: this.email,
          password: this.password,
          username: this.username,
        }),
      );

      if (user) {
        this.$router.push({ name: 'home' });
      }
    },
  },
  components: {
    AppAuthLayout,
    AppValidationErrors,
    ElRow,
    ElCard,
    ElInput,
    ElButton,
  },
};
</script>
