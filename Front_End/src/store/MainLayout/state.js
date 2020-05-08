export default {
    path: "/",
    title: "",
    rightTopIcon: "add",
    leftTopIcon: "menu",
    refreshIcon: "refresh",
    refreshState: false,
    login: Number(localStorage.getItem("login")),
    user: localStorage.getItem("user") !== "undefined" && localStorage.getItem("user") ?
        JSON.parse(localStorage.getItem("user")) :
        {
            createdTime: "",
            activatedTime: "",
            power: "",
            id: "",
            name: ""
        }
};