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
    console.log("commit MainLayout/login", value);
    localStorage.setItem("login", Number(value));
    console.log(!Number(localStorage.getItem("login")) ||
        !localStorage.getItem("Authorization")
    )
    if (value) {
        state.login = true;
    } else {
        state.login = false;
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");
    }
};
const subjects = (state, value) => {
    state.subjects = value;
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
    subjects,
    user
};
