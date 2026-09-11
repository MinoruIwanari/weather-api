import { createRouter, createWebHistory } from "vue-router";
import Vue3_3 from "../components/3-3.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "3-3",
      component: Vue3_3,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/4-1",
      name: "4-1",
      component: () => import("../components/4-1.vue"),
    },
    {
      path: "/5-1",
      name: "5-1",
      component: () => import("../components/5-1.vue"),
    },
    {
      path: "/6-1",
      name: "6-1",
      component: () => import("../components/6-1.vue"),
    },
    {
      path: "/7-1",
      name: "7-1",
      component: () => import("../components/7-1.vue"),
    },
  ],
});

export default router;
