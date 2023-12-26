import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from "./router"
import { createHead } from '@vueuse/head'

const head = createHead()
const pinia = createPinia()

createApp(App).use(router).use(pinia).use(head).mount('#app')
