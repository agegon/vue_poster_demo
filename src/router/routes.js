import Home from '@/views/Home.vue';

export const routes = [
  {
    component: Home,
    name: 'home',
    path: '/',
  },
  {
    component: () => import('@/views/Register.vue'),
    name: 'register',
    path: '/register',
  },
  {
    component: () => import('@/views/Login.vue'),
    name: 'login',
    path: '/login',
  },
];
