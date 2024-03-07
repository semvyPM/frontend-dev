import { createRouter, createWebHashHistory } from 'vue-router';
import CarcasPage from '../components/CarcasPage.vue';
import SignInPage from "@/components/SignInPage.vue";
import ClientPage from "@/components/ClientPage.vue";
import ClientsPage from "@/components/ClientsPage.vue";
import CalculationPage from "@/components/CalculationPage.vue";
import FoundationPage from "@/components/FoundationPage.vue";
import RoofPage from "@/components/RoofPage.vue";
import store from "@/store/index.js";
const routes = [
    { path: '/', name: 'signIn', component: SignInPage },
    { path: '/carcasPage/:id&createMode=:createMode&number=:numbers',  name: 'carcasPage', component: CarcasPage, props: true  },
    { path: '/client/:id',  name: 'clientPage', component: ClientPage, props: true },
    { path: '/clients',  name: 'clientsPage', component: ClientsPage, props: true   },
    { path: '/calculation/:idcalculation/:idclient',  name: 'calculationPage', component: CalculationPage, props: true },
    { path: '/foundation/:id&createMode=:createMode',  name: 'foundationPage', component: FoundationPage, props: true },
    { path: '/roof/:id',  name: 'roofPage', component: RoofPage, props: true },
];
const router = new createRouter({
    history: createWebHashHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token') == null) {
        if (to.path !== '/') {
            next('/');
            console.log("router " + token);
        }
        else {
            next();
            console.log("router " + token);
        }
    }
    else {
        if (to.path === '/') {
            next('/clients');
            console.log("router " + token);
        } else {
            next();
            console.log("router " + token);
        }
    }

    // store.dispatch('loadToken');
    // const token = localStorage.getItem('token');
});

export default router;