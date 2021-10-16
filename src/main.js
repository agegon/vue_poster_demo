import { createApp } from 'vue';

import { router } from './router';
import { store } from './store';
import App from './App.vue';

import 'element-plus/dist/index.css';
import './styles/main.scss';

createApp(App).use(store).use(router).mount('#app');
