import LOGIN from "./LOGIN";
import MAIN from "./MAIN";

const routes = [
    LOGIN,
    MAIN,
    {
        path: "*",
        component: () =>
            import ("pages/Error404.vue")
    }
];

export default routes;