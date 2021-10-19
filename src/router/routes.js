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
    component: () => import('@/views/ArticleView.vue'),
    name: 'article',
    path: '/articles/:id',
    meta: {
      title: 'View an article',
    },
  },
  {
    component: () => import('@/views/ArticleCreate.vue'),
    name: 'articleCreate',
    path: '/articles/create',
    meta: {
      isAuth: true,
      title: 'Create an article',
    },
  },
  {
    component: () => import('@/views/ArticleEdit.vue'),
    name: 'articleEdit',
    path: '/articles/:id/edit',
    meta: {
      isAuth: true,
      title: 'Update an article',
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
