import { createRouter, createWebHistory } from "vue-router";
import { Home, About, Auth } from "../views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
  ],
});

export default router;
