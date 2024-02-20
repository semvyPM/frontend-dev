import { createRouter, createWebHashHistory } from 'vue-router';
import CarcasPage from '../components/CarcasPage.vue';
import SignInPage from "@/components/SignInPage.vue";
const routes = [
    { path: '/', name: 'signIn', component: SignInPage },
    { path: '/carcasPage',  name: 'carcasPage', component: CarcasPage }
];
const router = new createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;