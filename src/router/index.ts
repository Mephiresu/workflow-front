import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { routes } from './routes'
import { useAppStore } from '../stores/app'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const appStore = useAppStore()

  if (appStore.needsSetup) {
    return to.name === 'setup' ? next() : next({ name: 'setup' })
  }

  if (!to.path.includes('auth') && !authStore.loggedIn) {
    next({ name: 'auth' })
  } else if (to.path.includes('auth') && authStore.loggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})
