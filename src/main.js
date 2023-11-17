import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import 'bootstrap'
const app = createApp(App)
const pinia = createPinia();
app.use(router)
app.use(pinia)
app.mount('#app')
