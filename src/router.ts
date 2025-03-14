import {createRouter, createWebHistory} from 'vue-router';
import TopView from "./components/AlbumList.vue";
import About from "./components/About.vue";
import Terms from './components/Terms.vue';
import Enquiries from './components/Enquiries.vue';
import Player from './components/Player.vue';

const routes = [
    {path: '/', name: 'top', component: TopView},
    {path: '/about', name: 'about', component: About},
    {path: '/terms', name: 'terms', component: Terms},
    {path: '/enquiries', name: 'enquiries', component: Enquiries},
    {path: '/player', name: 'player', component: Player},
]

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})

export default router;