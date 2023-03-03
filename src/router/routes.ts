import { type RouteRecordRaw } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import SignIn from '../pages/Auth/SignIn.vue'
import AuthPage from '../pages/Auth/AuthPage.vue'
import AdminPage from '../pages/Admin/AdminPage.vue'
import ChangeOtp from '../pages/Auth/ChangeOtp.vue'
import InstanceTab from '../pages/Admin/InstanceTab.vue'
import UsersTab from '../pages/Admin/UsersTab.vue'
import AccessManagementTab from '../pages/Admin/AccessManagementTab.vue'

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
    // TODO: guard
    path: '/admin',
    name: 'admin',
    redirect: '/admin/instance',
    component: AdminPage,
    children: [
      { path: 'instance', component: InstanceTab },
      { path: 'users', component: UsersTab },
      { path: 'access-management', component: AccessManagementTab },
    ],
  },
]
