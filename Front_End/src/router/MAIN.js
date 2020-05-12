import MainLayout from 'layouts/MainLayout.vue';
import Home from 'pages/MAIN/Home.vue';
import Setting from 'pages/MAIN/Setting.vue';
import About from 'pages/MAIN/About.vue'
import User from 'pages/MAIN/User.vue'
import UserList from 'pages/MAIN/UserList.vue'

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
        }
    ]
};



// export default {
//     path: "/",
//     component: () =>
//         import ("layouts/MainLayout.vue"),
//     children: [{
//             path: "",
//             meta: {
//                 index: 0,
//                 keepAlive: true
//             },
//             component: () =>
//                 import ("pages/MAIN/Home.vue")
//         },
//         {
//             path: "setting",
//             meta: {
//                 index: 1,
//                 keepAlive: true
//             },
//             component: () =>
//                 import ("pages/MAIN/Setting.vue")
//         },
//         {
//             path: "about",
//             meta: {
//                 index: 1,
//                 keepAlive: true
//             },
//             component: () =>
//                 import ("pages/MAIN/About.vue")
//         },
//         {
//             path: "user",
//             meta: {
//                 index: 1,
//                 keepAlive: true
//             },
//             component: () =>
//                 import ("pages/MAIN/User.vue")
//         },
//         {
//             path: "userList",
//             meta: {
//                 index: 1,
//                 keepAlive: true
//             },
//             component: () =>
//                 import ("pages/MAIN/UserList.vue")
//         }
//     ]
// };
