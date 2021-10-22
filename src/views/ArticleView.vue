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
        <div v-if="isAuthor" class="buttons">
          <router-link
            :to="{ name: 'articleEdit', params: { id: article.slug } }"
            v-slot="{ navigate }"
            custom
          >
            <el-button icon="el-icon-edit" size="mini" @click="navigate">Edit</el-button>
          </router-link>
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            @click="isDeleteConfirm = true"
          >
            Remove
          </el-button>
        </div>
      </el-row>
    </app-banner>
    <app-container>
      <main v-if="article">
        <el-row justify="center">
          <el-col :xs="24" :lg="16">
            <el-card class="pa-2">
              <p v-for="(p, idx) in body" :key="idx" class="mb-2">{{ p }}</p>
            </el-card>
          </el-col>
        </el-row>
      </main>
      <app-error v-else :error="error"></app-error>
    </app-container>
    <el-dialog v-model="isDeleteConfirm" width="320px">
      <span class="confirm-message">You will loose the article forever. Are you sure?</span>
      <template #footer>
        <el-button @click="isDeleteConfirm = false" size="mini">Cancel</el-button>
        <el-button type="danger" @click="handleDeleteArticle" size="mini">Confirm</el-button>
      </template>
    </el-dialog>
  </template>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { ElButton, ElCard, ElCol, ElDialog, ElRow } from 'element-plus';
import AppBanner from '@/components/AppBanner';
import AppError from '@/components/AppError';
import AppUser from '@/components/AppUser';
import AppContainer from '@/components/ui/AppContainer';
import AppLoader from '@/components/ui/AppLoader';
import {
  clearArticleState,
  CURRENT_ARTICLE_GETTERS,
  deleteArticle,
  getArticle,
} from '@/store/modules/currentArticle';
import { AUTH_GETTERS } from '@/store/modules/auth';

export default {
  setup() {
    const isDeleteConfirm = ref(false);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const fetchArticle = (id) => {
      store.dispatch(getArticle(id));
    };

    const handleDeleteArticle = async () => {
      isDeleteConfirm.value = false;
      const slug = route.params.id;
      const result = await store.dispatch(deleteArticle(slug));

      if (result) {
        router.push({ name: 'home' });
      }
    };

    onMounted(() => {
      fetchArticle(route.params.id);
    });

    onBeforeRouteUpdate((to, from, next) => {
      if (from.params.id !== to.params.id) {
        fetchArticle(to.params.id);
      }
      next();
    });

    onBeforeUnmount(() => {
      store.commit(clearArticleState());
    });

    const article = computed(() => store.getters[CURRENT_ARTICLE_GETTERS.DATA]);
    const isLoading = computed(() => store.getters[CURRENT_ARTICLE_GETTERS.IS_LOADING]);
    const error = computed(() => store.getters[CURRENT_ARTICLE_GETTERS.ERROR]);
    const currentUser = computed(() => store.getters[AUTH_GETTERS.CURRENT_USERNAME]);

    const isAuthor = computed(() => {
      if (!article.value || !currentUser.value) {
        return false;
      }

      return article.value.author.username === currentUser.value;
    });

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
      isAuthor,
      isDeleteConfirm,
      handleDeleteArticle,
    };
  },
  name: 'AppArticleView',
  components: {
    AppBanner,
    AppContainer,
    AppError,
    AppLoader,
    AppUser,
    ElButton,
    ElCard,
    ElCol,
    ElDialog,
    ElRow,
  },
};
</script>

<style lang="scss" scoped>
p {
  line-height: 1.25;
  text-align: justify;
}

.buttons button {
  min-width: 100px;
}

.confirm-message {
  word-break: normal;
}
</style>
