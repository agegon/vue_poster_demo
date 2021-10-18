<template>
  <app-container>
    <el-row justify="center">
      <el-col :sx="12" :lg="16">
        <h2 class="mb-2">Create an article</h2>
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
                :rows="4"
                v-model="body"
                :disabled="isSubmitting"
              ></el-input>
            </div>
            <div class="form-control mb-2">
              <label for="tags">Tags:</label>
              <el-input
                id="tags"
                name="tags"
                placeholder="Tags"
                type="text"
                v-model="tags"
                :disabled="isSubmitting"
              ></el-input>
            </div>
            <el-row justify="end">
              <el-button type="primary" native-type="submit" :loading="isSubmitting">
                Create
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
import AppValidationErrors from '@/components/AppValidationErrors';
import AppContainer from '@/components/ui/AppContainer';
import {
  CURRENT_ARTICLE_GETTERS,
  clearArticleState,
  createArticle,
} from '@/store/modules/currentArticle';

export default {
  name: 'AppCreateArticle',
  data() {
    return {
      title: '',
      description: '',
      body: '',
      tags: '',
    };
  },
  computed: mapGetters({
    isSubmitting: CURRENT_ARTICLE_GETTERS.IS_SUBMITTING,
    validationErrors: CURRENT_ARTICLE_GETTERS.VALIDATION_ERRORS,
  }),
  methods: {
    async handleSubmit() {
      const tagList = this.tags
        .toLowerCase()
        .replace(/[^a-z0-9\s]/, '')
        .split(' ')
        .filter((tag) => tag);

      const article = {
        title: this.title.trim(),
        body: this.body.trim(),
        description: this.description.trim(),
        tagList,
      };

      const created = await this.$store.dispatch(createArticle({ article }));

      if (created) {
        this.$router.push({ name: 'home' });
      }
    },
  },
  beforeUnmount() {
    this.$store.commit(clearArticleState());
  },
  components: {
    AppContainer,
    AppValidationErrors,
    ElButton,
    ElCard,
    ElCol,
    ElInput,
    ElRow,
  },
};
</script>

<style scoped></style>
