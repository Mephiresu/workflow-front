import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (!to.path.includes('auth') && !authStore.loggedIn) {
    next({ name: 'auth' })
  } else if (to.path.includes('auth') && authStore.loggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})
