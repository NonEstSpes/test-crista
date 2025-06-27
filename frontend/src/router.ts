import {createMemoryHistory, createRouter, Router, RouteRecordRaw} from "vue-router";
import List from "@/components/List.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: List
    }
]

export const router: Router = createRouter({
    history: createMemoryHistory(),
    routes,
})