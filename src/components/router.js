import { createRouter, createWebHashHistory } from 'vue-router';
import CarcasPage from '../components/CarcasPage.vue';
import SignInPage from "@/components/SignInPage.vue";
import ClientPage from "@/components/ClientPage.vue";
import ClientsPage from "@/components/ClientsPage.vue";
const routes = [
    { path: '/', name: 'signIn', component: SignInPage },
    { path: '/carcasPage',  name: 'carcasPage', component: CarcasPage },
    { path: '/client',  name: 'clientPage', component: ClientPage },
    { path: '/clients',  name: 'clientsPage', component: ClientsPage },
];
const router = new createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;