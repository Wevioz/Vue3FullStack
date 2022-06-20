import { createWebHistory, createRouter } from "vue-router";
import About from '@/components/About.vue';
import Todo from '@/components/Todo.vue';
import Acceuil from '@/components/Acceuil.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import MyAccount from '@/components/MyAccount.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "acceuil",
            component: Acceuil
        },
        {
            path: "/login", 
            name: "login",
            component: Login
        },
        {
            path: "/register", 
            name: "register",
            component: Register
        },
        {
            path: "/about", 
            name: "about",
            component: About
        },
        {
            path: "/todo", 
            name: "todo",
            component: Todo
        },
        {
            path: "/myaccount",
            name: "moncompte",
            component: MyAccount
        }
    ]
});

export default router;