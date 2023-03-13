import { type RouteRecordRaw } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import SignIn from '../pages/Auth/SignIn.vue'
import AuthPage from '../pages/Auth/AuthPage.vue'
import SettingsPage from '../pages/Admin/SettingsPage.vue'
import ChangeOtp from '../pages/Auth/ChangeOtp.vue'
import InstanceTab from '../pages/Admin/InstanceTab.vue'
import UsersTab from '../pages/Admin/UsersTab.vue'
import SetupPage from '../pages/SetupPage.vue'
import RolesTab from '../pages/Admin/RolesTab.vue'
import RoleTab from '../pages/Admin/RoleTab.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/setup', name: 'setup', component: SetupPage },
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
    path: '/settings',
    name: 'settings',
    redirect: '/settings/instance',
    component: SettingsPage,
    children: [
      { path: 'instance', component: InstanceTab },
      { path: 'users', component: UsersTab },
      { path: 'roles', name: 'roles', component: RolesTab },
      { path: 'roles/:roleId', name: 'role', component: RoleTab },
    ],
  },
]
