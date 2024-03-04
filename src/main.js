import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js';

import router from "@/components/router.js";
createApp(App).use(store).use(router).mount('#app')
