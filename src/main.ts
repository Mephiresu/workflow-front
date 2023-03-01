import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { registerLib } from './_lib'

const app = createApp(App)
app
  .use(
    createRouter({
      history: createWebHistory(),
      routes,
    })
  )
  .use(createPinia())
  .mount('#app')

registerLib(app)
