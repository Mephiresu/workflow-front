import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import { router } from '../router'
import { createToaster } from '@meforma/vue-toaster'

export const store = createPinia()

const toaster = createToaster({
  position: 'bottom',
})

store.use((context) => {
  context.store.$router = markRaw(router)
})

store.use((context) => {
  context.store.$toaster = markRaw(toaster)
})
