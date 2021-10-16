import Home from '@/views/Home.vue';

export const routes = [
  {
    component: Home,
    name: 'home',
    path: '/',
    meta: {
      title: 'Share your ideas with others',
    },
  },
  {
    component: () => import('@/views/Register.vue'),
    name: 'register',
    path: '/register',
    meta: {
      isAnonymous: true,
      title: 'Sigh up',
    },
  },
  {
    component: () => import('@/views/Login.vue'),
    name: 'login',
    path: '/login',
    meta: {
      isAnonymous: true,
      title: 'Sigh in',
    },
  },
  {
    component: () => import('@/views/Stub.vue'),
    name: 'settings',
    path: '/settings',
    meta: {
      isAuth: true,
      title: 'Settings',
    },
  },
  {
    component: () => import('@/views/Stub.vue'),
    name: 'createArticle',
    path: '/articles/create',
    meta: {
      isAuth: true,
      title: 'Create article',
    },
  },
  {
    component: () => import('@/views/Stub.vue'),
    name: 'userProfile',
    path: '/user/:username',
    meta: {
      title: 'User profile',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
];
