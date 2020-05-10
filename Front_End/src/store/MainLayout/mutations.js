const path = (state, value) => {
    state.path = value;
};
const title = (state, value) => {
    state.title = value;
};
const rightTopIcon = (state, value) => {
    state.rightTopIcon = value;
};
const leftTopIcon = (state, value) => {
    state.leftTopIcon = value;
};
const refreshIcon = (state, value) => {
    state.refreshIcon = value;
};
const refreshState = (state, value) => {
    state.refreshState = value;
};
const login = (state, value) => {
    let token = localStorage.getItem("Authorization");
    if (token && token !== "0") {
        state.login = value;
        if (!value) {
            localStorage.removeItem("Authorization");
            localStorage.removeItem("user");
        }
        localStorage.setItem("login", Number(value));
    } else {
        state.login = false
        localStorage.setItem("login", Number(false));
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");
    }
};
const user = (state, value) => {
    state.user = value;
    localStorage.setItem("user", JSON.stringify(value));
};
export {
    path,
    title,
    rightTopIcon,
    leftTopIcon,
    refreshIcon,
    refreshState,
    login,
    user
};
