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
            {
                path: "userinfo",
                component: () => import("@/views/user/UserInfo"),
            }
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// 定义路由导航守卫
router.beforeEach((to, from, next) => {
    // 判断用户是否已登录
    const token = localStorage.getItem('userinfo')
    if (token) {
        // 如果用户已登录，则继续导航
        next()
    } else {
        // 如果用户未登录，并且当前路由不是登录页面，则跳转到登录页面
        if (to.path !== '/login') {
            Vue.prototype.$message.error("请先登录!")
            next('/login')
        } else {
            next()
        }
    }
})
export default router;
