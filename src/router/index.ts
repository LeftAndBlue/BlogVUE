const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/components/login/login.vue"),
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../components/index/index.vue"),
  },
];
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
