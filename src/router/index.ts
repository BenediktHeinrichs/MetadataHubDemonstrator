import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomePage from "@/views/HomePage.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "HomePage",
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: HomePage,
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
];

const createCustomRouter = () => {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  return router;
};

export default createCustomRouter;
