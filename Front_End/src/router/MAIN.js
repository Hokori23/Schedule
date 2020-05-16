import MainLayout from "layouts/MainLayout.vue";
import Home from "pages/MAIN/Home.vue";
import Setting from "pages/MAIN/Setting.vue";
import About from "pages/MAIN/About.vue";
import User from "pages/MAIN/User.vue";
import UserList from "pages/MAIN/UserList.vue";
import SingleSubject from "pages/MAIN/SingleSubject.vue";
import SingleDay from "pages/MAIN/SingleDay.vue";
import ModifySubject from "pages/MAIN/ModifySubject.vue";

export default {
    path: "/",
    component: MainLayout,
    children: [{
            path: "",
            meta: {
                index: 0,
                keepAlive: true
            },
            component: Home
        },
        {
            path: "setting",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: Setting
        },
        {
            path: "about",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: About
        },
        {
            path: "user",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: User
        },
        {
            path: "userList",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: UserList
        },
        {
            path: "subject/:name",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: SingleSubject
        },
        {
            path: "day/:time",
            name: "day/:time",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: SingleDay
        },
        {
            path: "subject/modify",
            name: "subject/modify",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: ModifySubject
        }
    ]
};
