import { createStore } from 'vuex';
import { articlesModule } from './modules/articles/module';
import { authModule } from './modules/auth';

export const store = createStore({
  modules: {
    articles: articlesModule,
    auth: authModule,
  },
});
