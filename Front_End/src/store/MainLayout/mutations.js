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
    state.login = value;
    localStorage.setItem("login", Number(value));
};
export {
    path,
    title,
    rightTopIcon,
    leftTopIcon,
    refreshIcon,
    refreshState,
    login
};