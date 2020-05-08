const lang = (state, [value, vm]) => {
    if (state.lang !== value) {
        vm.$i18n.locale = state.lang = value;
        localStorage.setItem("language", value);
    }
};
const dark = (state, [value, vm]) => {
    localStorage.setItem("dark-mode", Number(value));
    state.dark = value;
    vm.$q.dark.set(value);
};

const days = (state, value) => {
    localStorage.setItem("days", value);
    state.days = value;
};
export { lang, dark, days };