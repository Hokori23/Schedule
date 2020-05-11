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
const subjectState = (state, value) => {
    state.subjectState = value;
};
const login = (state, value) => {
    localStorage.setItem("login", Number(value));
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

const online = (state, value) => {
    state.online = value;
};
export {
    path,
    title,
    rightTopIcon,
    leftTopIcon,
    refreshIcon,
    refreshState,
    subjectState,
    login,
    subjects,
    user,
    online
};
