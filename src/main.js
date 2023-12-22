import './assets/main.scss'

import { createApp } from 'vue'
import { pinia } from './stores/pinia';

import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'sweetalert2';

const app = createApp(App)
app.use(pinia);

app.use(router)

app.mount('#app')
