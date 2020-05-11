const getSubjectSortIcon = () => {
    let subjectSort = localStorage.getItem("subjectSort");
    if (subjectSort === "null") {
        return "sort";
    }
    if (Number(subjectSort)) {
        return "arrow_upward";
    } else {
        return "arrow_downward";
    }
};
const getSubjectSortState = () => {
    let subjectSort = localStorage.getItem("subjectSort");
    if (subjectSort === "null") {
        return null;
    }
    return Boolean(Number(subjectSort))
};
export default {
    path: "/",
    title: "",
    rightTopIcon: {
        display: true,
        icon: "more_vert"
    },
    rightTopIcon2: {
        display: true,
        icon: "add"
    },
    rightTopIcon3: {
        display: true,
        icon: getSubjectSortIcon()
    },
    leftTopIcon: {
        display: true,
        icon: "menu"
    },
    refreshState: false,
    subjectState: false,
    subjectSort: getSubjectSortState(),
    online: true,
    subjects: [],
    login: Number(localStorage.getItem("login")),
    user: localStorage.getItem("user") !== "undefined" &&
        localStorage.getItem("user") !== "null" &&
        localStorage.getItem("user") ?
        JSON.parse(localStorage.getItem("user")) :
        {
            id: null,
            name: null,
            createdTime: null,
            activatedTime: null,
            power: null
        }
};
