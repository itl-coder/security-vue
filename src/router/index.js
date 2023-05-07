import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/Register.vue"),
  },
  // 主页布局页面
  {
    path: "/admin",
    component: () => import("@/views/admin/index"),
    children: [
      {
        path: "/admin",
        redirect: "/admin/home",
      },
      {
        path: "home",
        component: () => import("@/views/admin/home"),
      },
      {
        path: "grade",
        component: () => import("@/views/grade/index"),
      },
      {
        path: "grade",
        component: () => import("@/views/grade/index"),
      },
      {
        path: "system",
        component: () => import("@/views/admin/system"),
      },
      {
        path: "user",
        component: () => import("@/views/user/user"),
      },
      {
        path: "clazz",
        component: () => import("@/views/admin/clazz"),
      },
      {
        path: "teacher",
        component: () => import("@/views/admin/teacher"),
      },
      // 资源
      {
        path: "audio",
        component: () => import("@/views/admin/audio"),
      },
      {
        path: "video",
        component: () => import("@/views/admin/video"),
      },
      {
        path: "doc",
        component: () => import("@/views/admin/doc"),
      },
      {
        path: "exercise",
        component: () => import("@/views/admin/exercise"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 定义路由导航守卫
// router.beforeEach((to, from, next) => {
//   // 判断用户是否已登录，这里使用一个简单的示例，假设用户未登录
//   const isLoggedIn = false;
//   if (to.path !== "/login" && !isLoggedIn) {
//     // 如果用户未登录且试图访问非登录页面，则跳转到登录页面
//     next("/login");
//   } else {
//     // 否则，继续导航
//     next();
//   }
// });

export default router;
