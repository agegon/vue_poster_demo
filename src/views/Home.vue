<template>
  <app-banner v-if="!isAuth" type="primary">
    <div class="content">
      <h1 class="mb-1">Poster</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </app-banner>
  <app-container>
    <el-row :gutter="16">
      <el-col :xs="24" :lg="18">
        <el-tabs :model-value="activeTab" @update:model-value="changeTab">
          <el-tab-pane v-if="isAuth" label="Your feed" :name="articleTabs.FEED"></el-tab-pane>
          <el-tab-pane label="Global feed" :name="articleTabs.GLOBAL"></el-tab-pane>
          <el-tab-pane
            v-if="activeTag"
            :label="`${activeTag}`"
            :name="articleTabs.TAG"
          ></el-tab-pane>
        </el-tabs>
        <app-articles :type="activeTab" :tag="activeTag"></app-articles>
      </el-col>
      <el-col class="hidden-md-and-down" :lg="6">
        <app-tags @click-tag="selectTag"></app-tags>
      </el-col>
    </el-row>
  </app-container>
</template>

<script>
import { ElCol, ElRow, ElTabs, ElTabPane } from 'element-plus';
import { mapGetters } from 'vuex';
import AppBanner from '@/components/AppBanner';
import AppArticles from '@/components/AppArticles';
import AppTags from '@/components/AppTags';
import AppContainer from '@/components/ui/AppContainer';
import { ARTICLE_LIST_TYPES } from '@/constants/articles';
import { AUTH_GETTERS } from '@/store/modules/auth';

export default {
  data(ctx) {
    const isAuth = ctx.$store.getters[AUTH_GETTERS.IS_AUTHENTICATED];

    return {
      articleTabs: ARTICLE_LIST_TYPES,
      activeTab: isAuth ? ARTICLE_LIST_TYPES.FEED : ARTICLE_LIST_TYPES.GLOBAL,
      activeTag: null,
    };
  },
  computed: {
    ...mapGetters({ isAuth: AUTH_GETTERS.IS_AUTHENTICATED }),
  },
  methods: {
    changeTab(tab) {
      if (tab !== this.activeTab) {
        this.activeTag = null;
        this.activeTab = tab;
      }
    },
    selectTag(tag) {
      this.activeTag = tag;
      this.activeTab = ARTICLE_LIST_TYPES.TAG;
    },
  },
  name: 'AppHome',
  components: {
    AppBanner,
    AppContainer,
    AppArticles,
    AppTags,
    ElCol,
    ElRow,
    ElTabs,
    ElTabPane,
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
