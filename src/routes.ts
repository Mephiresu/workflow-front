import { type RouteRecordRaw } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import SignIn from './pages/Auth/SignIn.vue'
import AuthWrapper from './pages/Auth/AuthWrapper.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/auth',
    name: 'auth',
    component: AuthWrapper,
    redirect: '/auth/sign-in',
    children: [{ path: 'sign-in', component: SignIn }],
  },
]
