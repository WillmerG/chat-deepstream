import { useStore } from "vuex";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        beforeEnter: (to, from, next) => {
          const $store = useStore();
          console.log("Voy1", $store);

          // next("login");
          next();
        },
      },
      { path: "login", component: () => import("pages/Login.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
