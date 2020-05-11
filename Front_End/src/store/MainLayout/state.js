export default {
    path: "/",
    title: "",
    rightTopIcon: "add",
    leftTopIcon: "menu",
    refreshIcon: "menu",
    refreshState: false,
    subjectState: false,
    online: true,
    subjects: [],
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
