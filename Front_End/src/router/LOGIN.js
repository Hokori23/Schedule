export default {
    path: '/login',
    component: () =>
        import ('layouts/LoginLayout.vue'),
    children: [{
        path: '',
        meta: {
            index: 0
        },
        component: () =>
            import ('pages/LOGIN/Login.vue'),
    }, {
        path: 'register',
        meta: {
            index: 1
        },
        component: () =>
            import ('pages/LOGIN/Register.vue')
    }]
}