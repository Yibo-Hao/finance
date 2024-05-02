import { createApp } from 'vue'
import { App } from './App'
import { routes } from './config/routes';
import { history } from './shared/history';
import { createRouter } from 'vue-router'

import './style/index.css';

import 'virtual:svgstore';

const router = createRouter({
    history,
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
