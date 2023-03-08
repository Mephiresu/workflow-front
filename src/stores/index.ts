import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import { router } from '../router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
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
