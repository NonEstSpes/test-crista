import Table from "@/components/Table.vue";
import {createMemoryHistory, createRouter, Router, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Table
    }
]

export const router: Router = createRouter({
    history: createMemoryHistory(),
    routes,
})