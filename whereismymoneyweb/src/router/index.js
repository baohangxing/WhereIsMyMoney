import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import About from "../views/About";
import Introduction from "../views/Introduction";

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
    {
        path: "/Introduction",
        name: "Introduction",
        component: Introduction
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    console.log(to);
    let token = window.localStorage.getItem('token');
    let firstIn = window.localStorage.getItem('firstIn');
    if (to.matched.some(record => record.meta.requiresAuth) && (!token)) {
        next({
            path: '/Login',
            //query: {redirect: to.fullPath}
        });
    } else if (!firstIn) {
        if (!firstIn) window.localStorage.setItem('firstIn', 'false');
        next({
            path: '/Introduction'
        });
    } else {
        next();
    }
});

export default router;
