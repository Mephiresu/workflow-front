import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerLib } from './_lib'
import { store } from './stores'
import { router } from './router'
import Toaster from '@meforma/vue-toaster'

const app = createApp(App).use(store).use(router).use(Toaster)
registerLib(app)
app.mount('#app')
