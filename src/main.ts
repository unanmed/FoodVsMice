import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
window.onload = () => import('./scripts/listen');