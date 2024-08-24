import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../../home/views/HomeView.vue'
import SignInView from "@/authentication/views/SignInView.vue";
import SignUpView from "@/authentication/views/SignUpView.vue";
import LogOutView from "@/authentication/views/LogOutView.vue";
import AccountView from "@/profile/views/AccountView.vue";
import AllProductsView from "@/products/views/AllProductsView.vue";
import DefaultView from "@/home/views/DefaultView.vue";
import { useAuthStore } from "@/util/store/auth";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: "",
                component: DefaultView,
                meta: {
                    requireAuth: false
                },
            },
            {
                path: "allProducts",
                name: "allProducts",
                component: AllProductsView,
                meta: {
                    requireAuth: true
                },
            },
        ]
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUpView
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: SignInView
    },
    {
        path: '/log-out',
        name: 'log-out',
        component: LogOutView
    },
    {
        path: '/profile',
        name: 'profile',
        component: AccountView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach(
    (to, from, next) => {
        const store = useAuthStore();
        const isAuthenticated =  store.isAuthenticated;

        const needAuth = to.meta.requireAuth;

        if(needAuth && !isAuthenticated) {
            next('sign-in');
        }else{
            next();
        }
    }
)

export default router
