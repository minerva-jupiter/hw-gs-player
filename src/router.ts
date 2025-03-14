import {createRouter, createWebHistory} from 'vue-router';
import TopView from "./components/TopView.vue";
import InfoView from "./components/InfoView.vue";

const routes = [
    {path: '/', name: 'top', component: TopView},
    {path: '/info', name: 'info', component: InfoView},
]

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})

export default router;