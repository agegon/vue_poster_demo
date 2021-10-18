import { createStore } from 'vuex';
import { articlesModule } from './modules/articles/module';
import { authModule } from './modules/auth';
import { currentArticleModule } from './modules/currentArticle';
import { tagsModule } from './modules/tags';

export const store = createStore({
  modules: {
    articles: articlesModule,
    auth: authModule,
    currentArticle: currentArticleModule,
    tags: tagsModule,
  },
});
