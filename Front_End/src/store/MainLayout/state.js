export default {
    path: "/",
    title: "",
    rightTopIcon: "add",
    leftTopIcon: "menu",
    refreshIcon: "refresh",
    refreshState: false,
    login: Number(localStorage.getItem("login")),
    user: localStorage.getItem("user") !== "undefined" &&
        localStorage.getItem("user") !== "null" &&
        localStorage.getItem("user") ?
        JSON.parse(localStorage.getItem("user")) : {
            id: null,
            name: null,
            createdTime: null,
            activatedTime: null,
            power: null
        }
};
