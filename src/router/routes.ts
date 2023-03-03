import { type RouteRecordRaw } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import SignIn from '../pages/Auth/SignIn.vue'
import AuthPage from '../pages/Auth/AuthPage.vue'
import AdminPage from '../pages/Admin/AdminPage.vue'
import ChangeOtp from '../pages/Auth/ChangeOtp.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/auth',
    name: 'auth',
    redirect: '/auth/sign-in',
    component: AuthPage,
    children: [
      { path: 'sign-in', component: SignIn },
      { path: 'change-otp', name: 'change-otp', component: ChangeOtp }, //TODO: guard only after login attempt
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
  },
]
