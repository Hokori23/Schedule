export default {
    path: "/",
    component: () =>
        import ("layouts/MainLayout.vue"),
    children: [{
            path: "",
            meta: {
                index: 0,
                keepAlive: true
            },
            component: () =>
                import ("pages/MAIN/Home.vue")
        },
        {
            path: "setting",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: () =>
                import ("pages/MAIN/Setting.vue")
        },
        {
            path: "about",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: () =>
                import ("pages/MAIN/About.vue")
        },
        {
            path: "user",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: () =>
                import ("pages/MAIN/User.vue")
        },
        {
            path: "userList",
            meta: {
                index: 1,
                keepAlive: true
            },
            component: () =>
                import ("pages/MAIN/UserList.vue")
        }
    ]
};