<template>
  <app-auth-layout title="Sign In">
    <template #link>
      <router-link class="link link--primary" :to="{ name: 'register' }">
        Need an account?
      </router-link>
    </template>
    <div v-if="validationErrors" class="mb-2">
      <app-validation-errors :errors="validationErrors"></app-validation-errors>
    </div>
    <el-card>
      <form @submit.prevent="handleSubmit">
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
            Sign In
          </el-button>
        </el-row>
      </form>
    </el-card>
  </app-auth-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElRow, ElCard, ElInput, ElButton } from 'element-plus';
import AppValidationErrors from '@/components/AppValidationErrors';
import AppAuthLayout from '@/layouts/AppAuthLayout';
import { AUTH_GETTERS, loginUser } from '@/store/modules/auth';

export default {
  name: 'AppLogin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: mapGetters({
    isSubmitting: AUTH_GETTERS.IS_SUBMITTING,
    validationErrors: AUTH_GETTERS.VALIDATION_ERRORS,
  }),
  methods: {
    async handleSubmit() {
      const user = await this.$store.dispatch(
        loginUser({
          email: this.email,
          password: this.password,
        }),
      );

      if (user) {
        const nextRoute = this.$route.query.to;
        this.$router.push(nextRoute ? decodeURIComponent(nextRoute) : { name: 'home' });
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

<style scoped>
h1 {
  text-align: center;
}

p {
  text-align: center;
}
</style>
