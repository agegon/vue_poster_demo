import { store } from '@/store';
import { AUTH_GETTERS } from '@/store/modules/auth';

export const protectRoute = (to) => {
  if (to.meta?.isAuth && store.getters[AUTH_GETTERS.IS_ANONYMOUS]) {
    return { name: 'login', query: { to: encodeURIComponent(to.fullPath) } };
  } else if (to.meta?.isAnonymous && store.getters[AUTH_GETTERS.IS_AUTHENTICATED]) {
    return { name: 'home' };
  }

  return null;
};
