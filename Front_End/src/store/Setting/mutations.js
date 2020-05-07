const lang = (state, [value, vm]) => {
    if (state.lang !== value) {
        vm.$i18n.locale = state.lang = value;
        localStorage.setItem("language", value);
    }
};
export { lang };