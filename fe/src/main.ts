import { createApp } from 'vue'
import { App } from './App'
import { Foo } from './pages/Foo'
import { Bar } from './pages/Bar'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {path: '/', component: Foo},
    {path: '/about', component: Bar},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
