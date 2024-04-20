import { RouteRecordRaw } from 'vue-router'

import { Welcome } from '../pages/Welcome'
import { SignIn } from '../pages/SignIn'

export const routes: RouteRecordRaw[] = [
    {path: '/', component: Welcome},
    {path: '/sign-in', component: SignIn},
];