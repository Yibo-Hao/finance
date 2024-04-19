import { RouteRecordRaw } from 'vue-router'

import { Welcome } from '../pages/Welcome'

export const routes: RouteRecordRaw[] = [
    {path: '/welcome', component: Welcome},
];