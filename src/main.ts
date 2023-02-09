import { createApp } from 'vue';
import App from './App.vue';
import { loadInitResource } from './game/init';
import './style/main.less';

createApp(App).mount('#app');
loadInitResource();
