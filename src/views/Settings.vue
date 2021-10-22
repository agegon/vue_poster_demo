<template>
  <app-container>
    <h1 class="my-2">Settings of your profile</h1>
    <el-row justify="center">
      <el-col :xs="24" :lg="16">
        <div v-if="validationErrors" class="mb-2">
          <app-validation-errors :errors="validationErrors"></app-validation-errors>
        </div>
        <el-tabs v-model="currentTab">
          <el-tab-pane label="About" :name="settingsTabs.ABOUT">
            <el-card>
              <form @submit.prevent="handleSaveProfile">
                <div class="avatar-field mb-2">
                  <app-avatar
                    class="mr-2"
                    shape="square"
                    :src="imagePreview"
                    :size="100"
                  ></app-avatar>
                  <div class="form-control">
                    <label for="image">Image of profile:</label>
                    <el-input
                      id="image"
                      name="image"
                      placeholder="URL of avatar"
                      type="text"
                      v-model="image"
                      :disabled="isSubmitting"
                      @blur="imagePreview = image"
                    ></el-input>
                  </div>
                </div>
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
                  <label for="bio">Bio:</label>
                  <el-input
                    id="bio"
                    name="bio"
                    placeholder="Tell short about yourself"
                    type="textarea"
                    v-model="bio"
                    :rows="8"
                    :disabled="isSubmitting"
                  ></el-input>
                </div>
                <el-row justify="end">
                  <el-button type="primary" native-type="submit" :loading="isSubmitting">
                    Save
                  </el-button>
                </el-row>
              </form>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="Security" :name="settingsTabs.SEQURITY">
            <h4 class="my-2">Update email</h4>
            <el-card>
              <form @submit.prevent="handleUpdateEmail">
                <div class="form-control mb-2">
                  <label for="email">New email:</label>
                  <el-input
                    id="email"
                    name="email"
                    placeholder="New email"
                    type="text"
                    v-model="email"
                    :disabled="isSubmitting"
                  ></el-input>
                </div>
                <div class="form-control mb-2">
                  <label for="email-password">Password:</label>
                  <el-input
                    id="email-password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    v-model="emailPassword"
                    :disabled="isSubmitting"
                  ></el-input>
                </div>
                <el-row justify="end">
                  <el-button type="primary" native-type="submit" :loading="isSubmitting">
                    Update
                  </el-button>
                </el-row>
              </form>
            </el-card>

            <h4 class="mt-4 mb-2">Update password</h4>
            <el-card>
              <form @submit.prevent="handleUpdatePassword">
                <div class="form-control mb-2">
                  <label for="passwod">Current password:</label>
                  <el-input
                    id="password"
                    name="password"
                    placeholder="Current password"
                    type="password"
                    v-model="password"
                    :disabled="isSubmitting"
                  ></el-input>
                </div>
                <div class="form-control mb-2">
                  <label for="new-password">New password:</label>
                  <el-input
                    id="new-password"
                    name="new_password"
                    placeholder="New password"
                    type="password"
                    v-model="newPassword"
                    :disabled="isSubmitting"
                  ></el-input>
                </div>
                <el-row justify="end">
                  <el-button type="primary" native-type="submit" :loading="isSubmitting">
                    Update
                  </el-button>
                </el-row>
              </form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </app-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElButton, ElCard, ElCol, ElInput, ElRow, ElTabs, ElTabPane } from 'element-plus';
import AppValidationErrors from '@/components/AppValidationErrors';
import AppAvatar from '@/components/ui/AppAvatar';
import AppContainer from '@/components/ui/AppContainer';
import { AUTH_GETTERS, updateCurrentUser } from '@/store/modules/auth';

const SETTINGS_TABS = {
  ABOUT: 'about',
  SEQURITY: 'sequrity',
};

export default {
  name: 'AppSettings',
  data() {
    return {
      email: '',
      emailPassword: '',
      password: '',
      newPassword: '',
      image: '',
      imagePreview: '',
      username: '',
      bio: '',
      currentTab: SETTINGS_TABS.ABOUT,
      settingsTabs: SETTINGS_TABS,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: AUTH_GETTERS.CURRENT_USER,
      isSubmitting: AUTH_GETTERS.IS_SUBMITTING,
      validationErrors: AUTH_GETTERS.VALIDATION_ERRORS,
    }),
  },
  methods: {
    handleSaveProfile() {
      const user = {
        image: this.image,
        bio: this.bio,
        username: this.username,
      };

      this.$store.dispatch(updateCurrentUser(user));
    },
    handleUpdateEmail() {
      const user = {
        email: this.email,
        password: this.emailPassword,
      };

      this.$store.dispatch(updateCurrentUser(user));
    },
    handleUpdatePassword() {
      const user = {
        newPassword: this.newPassword,
        password: this.password,
      };

      this.$store.dispatch(updateCurrentUser(user));
    },
  },
  mounted() {
    this.image = this.currentUser.image;
    this.imagePreview = this.currentUser.image;
    this.bio = this.currentUser.bio;
    this.username = this.currentUser.username;
    this.email = this.currentUser.email;
  },
  watch: {
    currentUser(val) {
      this.image = val.image;
      this.imagePreview = val.image;
      this.bio = val.bio;
      this.username = val.username;
      this.email = val.email;
      this.password = '';
      this.newPassword = '';
      this.emailPassword = '';
    },
  },
  components: {
    AppAvatar,
    AppContainer,
    AppValidationErrors,
    ElButton,
    ElCard,
    ElCol,
    ElInput,
    ElRow,
    ElTabs,
    ElTabPane,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.collapse {
  background-color: transparent;
}

.avatar-field {
  align-items: flex-end;
  display: flex;

  .form-control {
    flex-grow: 1;
  }
}
</style>
