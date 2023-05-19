import { type RouteRecordRaw } from 'vue-router'

import SignIn from '../pages/Auth/SignIn.vue'
import AuthPage from '../pages/Auth/AuthPage.vue'
import SettingsPage from '../pages/Admin/SettingsPage.vue'
import ChangeOtp from '../pages/Auth/ChangeOtp.vue'
import InstanceTab from '../pages/Admin/InstanceTab.vue'
import UsersTab from '../pages/Admin/UsersTab.vue'
import UserTab from '../pages/Admin/UserTab.vue'
import SetupPage from '../pages/SetupPage.vue'
import RolesTab from '../pages/Admin/RolesTab.vue'
import RoleTab from '../pages/Admin/RoleTab.vue'
import ProjectsPage from '../pages/Projects/ProjectsPage.vue'
import ProjectPage from '../pages/Projects/ProjectPage.vue'
import ProjectSettingsPage from '../pages/Projects/ProjectSettingsPage.vue'
import NewProjectPage from '../pages/Projects/NewProjectPage.vue'
import BoardPage from '../pages/Projects/BoardPage.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', redirect: '/projects' },
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
      { path: 'users/:username', name: 'user', component: UserTab },
      { path: 'roles', name: 'roles', component: RolesTab },
      { path: 'roles/:roleName', name: 'role', component: RoleTab },
    ],
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsPage,
  },
  {
    path: '/projects/new',
    name: 'new-project',
    component: NewProjectPage,
  },
  {
    path: '/projects/:projectId',
    name: 'project',
    component: ProjectPage,
    children: [
      { path: '', name: 'project-board', component: BoardPage },
      {
        path: 'settings',
        name: 'project-settings',
        component: ProjectSettingsPage,
      },
    ],
  },
]
