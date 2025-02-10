import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import Login from "../views/Login.vue";
import Layout from "../views/Layout.vue";
import Demand from "../views/demand.vue";
import Material from "../views/Material.vue";
import Schema from "../views/Schema.vue";
import Simulation from "../views/Simulation.vue";
import System from "../views/System.vue";

const routes = [
    {
        path: "/",
        component: Layout,
        redirect: "/demand",
        children: [
            {path: '/demand', component: Demand},
            {path: '/material', component: Material},
            {path: '/schema', component: Schema},
            {path: '/simulation', component: Simulation},
            {path: '/system', component: System},
        ]
    },
    {
        path: "/login",
        component: Login,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;