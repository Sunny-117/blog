import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from '@/stores'

createApp(App).use(pinia).mount('#app')
