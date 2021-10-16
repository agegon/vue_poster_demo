import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { protectRoute } from './routeGuard';

const DEFAULT_TITLE = 'Poster';

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const redirectRoute = protectRoute(to);

  if (redirectRoute) {
    next(redirectRoute);
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta?.title ? to.meta?.title + ' | Poster' : DEFAULT_TITLE;
});
