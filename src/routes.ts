import { type RouteRecordRaw } from 'vue-router'

import Home from './pages/Home.vue'
import SignIn from './pages/Auth/SignIn.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: 'auth', component: SignIn },
]
