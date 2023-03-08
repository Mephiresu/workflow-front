import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerLib } from './_lib'
import { store } from './stores'
import { router } from './router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
import Toaster from '@meforma/vue-toaster'

const app = createApp(App).use(store).use(router).use(Toaster)
registerLib(app)
app.mount('#app')
