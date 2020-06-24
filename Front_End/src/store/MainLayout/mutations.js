const path = (state, value) => {
  state.path = value;
};

const title = (state, value) => {
  state.title = value;
};

const rightTopIcon = (state, { display, icon }) => {
  if (display !== undefined) {
    state.rightTopIcon.display = display;
  }
  state.rightTopIcon.icon = icon || state.rightTopIcon.icon;
};

const rightTopIcon2 = (state, { display, icon }) => {
  if (display !== undefined) {
    state.rightTopIcon2.display = display;
  }
  state.rightTopIcon2.icon = icon || state.rightTopIcon2.icon;
};

const rightTopIcon3 = (state, { display, icon }) => {
  if (display !== undefined) {
    state.rightTopIcon3.display = display;
  }
  state.rightTopIcon3.icon = icon || state.rightTopIcon3.icon;
};

const leftTopIcon = (state, { display, icon }) => {
  state.leftTopIcon.display = display;
  state.leftTopIcon.icon = icon || state.leftTopIcon.icon;
};

const refreshState = (state, value) => {
  state.refreshState = value;
};
//加载科目状态
const subjectState = (state, value) => {
  state.subjectState = value;
};

const login = (state, value) => {
  localStorage.setItem("login", Number(value));
  if (value) {
    state.login = true;
  } else {
    state.login = false;
    for (let i in state.user) {
      state.user[i] = null;
    }
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

const subjectSort = (state, value) => {
  state.subjectSort = value;
  if (value === null) {
    localStorage.setItem("subjectSort", null);
    return;
  }
  localStorage.setItem("subjectSort", Number(value));
};
export {
  path,
  title,
  rightTopIcon,
  rightTopIcon2,
  rightTopIcon3,
  leftTopIcon,
  refreshState,
  subjectState,
  login,
  subjects,
  user,
  online,
  subjectSort
};
