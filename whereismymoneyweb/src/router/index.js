import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import About from "../views/About";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/About",
        name: "About",
        component: About
    },
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && (!token)) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        });
    } else {
        next();
    }
});

export default router;
