import { i18n } from "../../boot/i18n";

export default {
    lang: i18n.locale,
    dark: Boolean(Number(localStorage.getItem("dark-mode"))),
    days: Number(localStorage.getItem('days')) || 7,
};