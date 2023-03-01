import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

createApp(App)
  .use(
    createRouter({
      history: createWebHistory(),
      routes,
    })
  )
  .use(createPinia())
  .mount('#app')
