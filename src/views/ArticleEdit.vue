<template>
  <app-loader v-if="isLoading" class="my-4"></app-loader>
  <app-error v-else-if="!article" :error="error"></app-error>
  <app-container v-else>
    <el-row justify="center">
      <el-col :sx="12" :lg="16">
        <h2 class="mb-2">Update an article</h2>
        <div v-if="validationErrors" class="mb-2">
          <app-validation-errors :errors="validationErrors"></app-validation-errors>
        </div>
        <el-card>
          <form @submit.prevent="handleSubmit">
            <div class="form-control mb-2">
              <label for="title">Title:</label>
              <el-input
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                v-model="title"
                :disabled="isSubmitting"
              ></el-input>
            </div>
            <div class="form-control mb-2">
              <label for="description">Description:</label>
              <el-input
                id="description"
                name="description"
                placeholder="Description"
                type="text"
                v-model="description"
                :disabled="isSubmitting"
              ></el-input>
            </div>
            <div class="form-control mb-2">
              <label for="body">Body:</label>
              <el-input
                id="body"
                name="body"
                placeholder="Body"
                type="textarea"
                resize="none"
                :autosize="false"
                :rows="8"
                v-model="body"
                :disabled="isSubmitting"
              ></el-input>
            </div>
            <el-row class="buttons" justify="end">
              <router-link
                :to="{ name: 'article', params: { id: article.slug } }"
                v-slot="{ navigate }"
                custom
              >
                <el-button native-type="button" @click="navigate" :disabled="isSubmitting">
                  Cancel
                </el-button>
              </router-link>
              <el-button type="primary" native-type="submit" :loading="isSubmitting">
                Save
              </el-button>
            </el-row>
          </form>
        </el-card>
      </el-col>
    </el-row>
  </app-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElRow, ElCol, ElCard, ElInput, ElButton } from 'element-plus';
import AppError from '@/components/AppError';
import AppValidationErrors from '@/components/AppValidationErrors';
import AppContainer from '@/components/ui/AppContainer';
import AppLoader from '@/components/ui/AppLoader';
import {
  CURRENT_ARTICLE_GETTERS,
  clearArticleState,
  updateArticle,
  getArticle,
} from '@/store/modules/currentArticle';
import { AUTH_GETTERS } from '@/store/modules/auth';

export default {
  name: 'AppArticleEdit',
  data() {
    return {
      title: '',
      description: '',
      body: '',
    };
  },
  computed: mapGetters({
    article: CURRENT_ARTICLE_GETTERS.DATA,
    currentUser: AUTH_GETTERS.CURRENT_USERNAME,
    error: CURRENT_ARTICLE_GETTERS.ERROR,
    isLoading: CURRENT_ARTICLE_GETTERS.IS_LOADING,
    isSubmitting: CURRENT_ARTICLE_GETTERS.IS_SUBMITTING,
    validationErrors: CURRENT_ARTICLE_GETTERS.VALIDATION_ERRORS,
  }),
  methods: {
    async fetchArticle() {
      const slug = this.$route.params.id;
      const currentAricle = await this.$store.dispatch(getArticle(slug));

      if (currentAricle && currentAricle.author.username !== this.currentUser) {
        this.$router.push({ name: 'article', params: { id: slug } });
      }
    },
    async handleSubmit() {
      const slug = this.article.slug;

      const article = {
        title: this.title.trim(),
        body: this.body.trim(),
        description: this.description.trim(),
      };

      const updated = await this.$store.dispatch(updateArticle({ slug, article }));

      if (updated) {
        this.$router.push({ name: 'article', params: { id: slug } });
      }
    },
  },
  mounted() {
    this.fetchArticle();
  },
  watch: {
    article(data) {
      if (data) {
        this.title = data.title;
        this.body = data.body;
        this.description = data.description;
      } else {
        this.title = '';
        this.body = '';
        this.description = '';
      }
    },
  },
  beforeUnmount() {
    this.$store.commit(clearArticleState());
  },
  components: {
    AppContainer,
    AppError,
    AppLoader,
    AppValidationErrors,
    ElButton,
    ElCard,
    ElCol,
    ElInput,
    ElRow,
  },
};
</script>

<style lang="scss" scoped>
.buttons button {
  min-width: 100px;
}
</style>
