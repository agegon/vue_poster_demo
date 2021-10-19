<template>
  <app-loader v-if="isLoading" class="my-4"></app-loader>
  <template v-else>
    <app-banner type="success">
      <h1 class="mb-2">{{ title }}</h1>
      <el-row justify="space-between" align="bottom">
        <app-user
          v-if="article"
          :username="article.author.username"
          :image="article.author.image"
          :date="article.createdAt"
        ></app-user>
        <div class="buttons">
          <el-button icon="el-icon-edit" size="mini">Edit</el-button>
          <el-button icon="el-icon-delete" type="danger" size="mini">Remove</el-button>
        </div>
      </el-row>
    </app-banner>
    <app-container>
      <main v-if="article">
        <el-row justify="center">
          <el-col :xs="24" :lg="16">
            <p v-for="(p, idx) in body" :key="idx" class="mb-2">{{ p }}</p>
          </el-col>
        </el-row>
      </main>
      <app-error v-else :error="error"></app-error>
    </app-container>
  </template>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ElButton, ElCol, ElRow } from 'element-plus';
import AppBanner from '@/components/AppBanner';
import AppError from '@/components/AppError';
import AppUser from '@/components/AppUser';
import AppContainer from '@/components/ui/AppContainer';
import AppLoader from '@/components/ui/AppLoader';
import { CURRENT_ARTICLE_GETTERS, getArticle } from '@/store/modules/currentArticle';

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const fetchArticle = () => {
      const slug = route.params.id;
      store.dispatch(getArticle(slug));
    };

    onMounted(() => {
      fetchArticle();
    });

    const article = computed(() => store.getters[CURRENT_ARTICLE_GETTERS.DATA]);
    const isLoading = computed(() => store.getters[CURRENT_ARTICLE_GETTERS.IS_LOADING]);
    const error = computed(() => store.getters[CURRENT_ARTICLE_GETTERS.ERROR]);

    const title = computed(() =>
      article.value ? article.value.title : 'An article was not loaded',
    );

    const body = computed(() =>
      article.value ? article.value.body.split('\n').filter((p) => p.trim()) : [],
    );

    watch([title, error], ([value]) => {
      document.title = `${value} | Poster`;
    });

    return {
      article,
      body,
      error,
      title,
      isLoading,
    };
  },
  name: 'AppStub',
  components: {
    AppBanner,
    AppContainer,
    AppError,
    AppLoader,
    AppUser,
    ElButton,
    ElCol,
    ElRow,
  },
};
</script>

<style lang="scss" scoped>
p {
  font-family: serif;
  font-size: 1.2rem;
  text-align: justify;
}

.buttons button {
  min-width: 100px;
}
</style>
