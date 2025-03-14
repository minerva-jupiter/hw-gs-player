import { createApp } from 'vue'
import { createManager } from '@vue-youtube/core';
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createManager())
app.use(router)
app.mount('#app')
