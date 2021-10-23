import { createStore } from 'vuex';
import { articlesModule } from './modules/articles/module';
import { authModule } from './modules/auth';
import { commentsModule } from './modules/comments';
import { currentArticleModule } from './modules/currentArticle';
import { currentProfileModule } from './modules/currentProfile';
import { tagsModule } from './modules/tags';

export const store = createStore({
  modules: {
    articles: articlesModule,
    auth: authModule,
    comments: commentsModule,
    currentArticle: currentArticleModule,
    currentProfile: currentProfileModule,
    tags: tagsModule,
  },
});
