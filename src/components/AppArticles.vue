<template>
  <app-loader v-if="isLoading" class="my-4"></app-loader>
  <el-empty v-else-if="!articles.length" description="No articles are here... yet."></el-empty>
  <template v-else>
    <article class="mb-2" v-for="article in articles" :key="article.slug">
      <el-card>
        <template #header>
          <el-row justify="space-between">
            <el-row>
              <el-avatar
                class="mr-1"
                icon="el-icon-user-solid"
                :src="article.author.image"
                :size="32"
              ></el-avatar>
              <div>
                <p>
                  <router-link
                    class="link link--primary"
                    :to="{ name: 'userProfile', params: { username: article.author.username } }"
                  >
                    {{ article.author.username }}
                  </router-link>
                </p>
                <p class="created">{{ new Date(article.createdAt).toLocaleString() }}</p>
              </div>
            </el-row>
            <div>
              <el-button
                v-if="isAuth"
                size="small"
                type="primary"
                :icon="article.favorited ? 'el-icon-star-on' : 'el-icon-star-off'"
                :plain="!article.favorited"
              >
                {{ article.favoritesCount }}
              </el-button>
              <app-star-count v-else>{{ article.favoritesCount }}</app-star-count>
            </div>
          </el-row>
        </template>

        <router-link
          class="description-link link--shadow mb-2"
          :to="{ name: 'article', params: { id: article.slug } }"
        >
          <h2 class="mb-2">{{ article.title }}</h2>
          <p class="description mb-2">{{ article.description }}</p>
        </router-link>

        <el-row justify="space-between" align="middle">
          <div class="mb-n1">
            <el-tag
              v-for="tag in article.tagList"
              :key="tag"
              class="mr-1 mb-1"
              size="mini"
              type="info"
              effect="plain"
            >
              {{ tag }}
            </el-tag>
          </div>
          <router-link
            class="link link--primary read-more"
            :to="{ name: 'article', params: { id: article.slug } }"
          >
            Read more
          </router-link>
        </el-row>
      </el-card>
    </article>
    <el-row justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articlesCount"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="page"
        @update:current-page="handleChangePage"
        hide-on-single-page
      >
      </el-pagination>
    </el-row>
  </template>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { ElAvatar, ElButton, ElCard, ElEmpty, ElPagination, ElRow, ElTag } from 'element-plus';
import AppLoader from '@/components/ui/AppLoader';
import AppStarCount from '@/components/ui/AppStarCount';
import { ARTICLES_GETTERS, getArticles } from '@/store/modules/articles';
import { ARTICLE_LIST_TYPES } from '@/constants/articles';
import { AUTH_GETTERS } from '@/store/modules/auth';

export default {
  name: 'AppArticles',
  setup(props) {
    const pageSize = 10;
    const page = ref(1);
    const store = useStore();

    const type = computed(() => props.type);
    const tag = computed(() => props.tag);

    const fetchArticles = () => {
      const params = {
        isFeed: type.value === ARTICLE_LIST_TYPES.FEED,
        tag: tag.value || undefined,
        limit: pageSize,
        offset: (page.value - 1) * pageSize,
      };

      store.dispatch(getArticles(params));
    };

    onMounted(() => {
      fetchArticles();
    });

    const handleChangePage = (nextPage) => {
      page.value = nextPage;
      fetchArticles();
    };

    const articles = computed(() => store.getters[ARTICLES_GETTERS.ARTICLES_DATA]);
    const articlesCount = computed(() => store.getters[ARTICLES_GETTERS.ARTICLES_COUNT]);
    const isLoading = computed(() => store.getters[ARTICLES_GETTERS.IS_LOADING]);
    const isAuth = computed(() => store.getters[AUTH_GETTERS.IS_AUTHENTICATED]);

    watch([type, tag], () => {
      fetchArticles();
    });

    return {
      articles,
      articlesCount,
      isAuth,
      isLoading,
      handleChangePage,
      page,
      pageSize,
    };
  },
  props: {
    tag: String,
    type: String,
  },
  components: {
    AppLoader,
    AppStarCount,
    ElAvatar,
    ElButton,
    ElCard,
    ElEmpty,
    ElPagination,
    ElRow,
    ElTag,
  },
};
</script>

<style scoped>
.created {
  color: var(--el-color-info);
  font-size: 0.8rem;
}

.description {
  color: var(--el-color-info);
  display: -webkit-box;
  height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.read-more {
  font-size: 0.825rem;
}

.description-link {
  display: block;
}
</style>
