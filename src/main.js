import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js';
import VueTheMask from 'vue-the-mask';

import router from "@/router.js";
createApp(App).use(store).use(router).use(VueTheMask).mount('#app')
