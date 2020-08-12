import axios from "axios";

const getAllSubjects = ({ commit, state }, vm) => {
  return new Promise((resolve, reject) => {
    vm && (vm.subjectState = true);
    vm && (vm.$q.loadingBar.start());

    let source = null;
    if (vm && vm.cancelTokenArr) {
      const CancelToken = axios.CancelToken;
      source = CancelToken.source();
      vm.cancelTokenArr.push(source);
    }
    axios
      .get("/subject", {
        cancelToken: (source && source.token) || null
      })
      .then(res => {
        //获取科目成功
        commit("subjects", res.data.data);
        resolve(res);
      })
      .catch(e => {
        if (e.message === "取消请求") {
          resolve(null);
        } else {
          //获取科目失败
          reject(e);
        }
      })
      .finally(() => {
        vm && (vm.subjectState = false);
        vm && (vm.$q.loadingBar.stop());

        if (vm && vm.cancelTokenArr) {
          const index = vm.cancelTokenArr.indexOf(source);
          if (index !== -1) {
            vm.cancelTokenArr.splice(index, 1);
          }
        }
      });
  });
};

const getSingleAssignments = ({ commit, state }, vm) => {
  return new Promise((resolve, reject) => {
    vm.loadingState = true;
    vm.$q.loadingBar.start();

    let source = null;
    if (vm.cancelTokenArr) {
      const CancelToken = axios.CancelToken;
      source = CancelToken.source();
      vm.cancelTokenArr.push(source);
    }

    axios
      .get("/assignment", {
        cancelToken: (source && source.token) || null,
        params: {
          name: vm.name
        }
      })
      .then(res => {
        //获取所有作业成功
        resolve(res.data.data);
      })
      .catch(e => {
        if ((e.message = "取消请求")) {
          resolve(null);
        }
        //获取所有作业失败
        reject(e);
      })
      .finally(() => {
        vm.loadingState = false;
        vm.$q.loadingBar.stop();

        if (vm.cancelTokenArr) {
          const index = vm.cancelTokenArr.indexOf(source);
          if (index !== -1) {
            vm.cancelTokenArr.splice(index, 1);
          }
        }
      });
  });
};

const getAllAssignments = ({ commit, state }, vm, nonStateFlag) => {
  return new Promise((resolve, reject) => {
    !nonStateFlag && (vm.assignmentState = true);
    vm.$q.loadingBar.start();

    let source = null;
    if (vm.cancelTokenArr) {
      const CancelToken = axios.CancelToken;
      source = CancelToken.source();
      vm.cancelTokenArr.push(source);
    }

    axios
      .get("/assignment", {
        cancelToken: (source && source.token) || null
      })
      .then(res => {
        //获取所有作业成功
        resolve(res.data.data);
      })
      .catch(e => {
        if ((e.message = "取消请求")) {
          resolve(null);
        }
        //获取所有作业失败
        reject(e);
      })
      .finally(() => {
        !nonStateFlag && (vm.assignmentState = false);
        vm.$q.loadingBar.stop();

        if (vm.cancelTokenArr) {
          const index = vm.cancelTokenArr.indexOf(source);
          if (index !== -1) {
            vm.cancelTokenArr.splice(index, 1);
          }
        }
      });
  });
};

const getAssignmentsInPeriod = (
  { commit, state },
  [days, vm, startTimeStamp, done]
) => {
  return new Promise((resolve, reject) => {
    vm.assignmentState = true;
    vm.$q.loadingBar.start();

    let source = null;
    if (vm.cancelTokenArr) {
      const CancelToken = axios.CancelToken;
      source = CancelToken.source();
      vm.cancelTokenArr.push(source);
    }
    let nowFloorTimeStamp = startTimeStamp || vm.$timeStampFloor();

    axios
      .get("/assignment", {
        cancelToken: (source && source.token) || null,
        params: {
          startLine: nowFloorTimeStamp,
          deadLine: nowFloorTimeStamp + vm.$day * days
        }
      })
      .then(res => {
        //获取某时间段所有作业成功
        let data = res.data.data;
        let length = data.length;
        for (let i = 0; i < length; i++) {
          data[i].deadLine = Number(data[i].deadLine);
          data[i].lastModified = Number(data[i].lastModified);
        }
        resolve(data);
      })
      .catch(e => {
        if ((e.message = "取消请求")) {
          resolve(null);
        }
        //获取某时间段所有作业失败
        reject(e);
      })
      .finally(() => {
        vm.assignmentState = false;
        vm.$q.loadingBar.stop();

        if (vm.cancelTokenArr) {
          const index = vm.cancelTokenArr.indexOf(source);
          if (index !== -1) {
            vm.cancelTokenArr.splice(index, 1);
          }
        }
        if (done) {
          done();
        }
      });
  });
};

const addAssignment = ({ commit, state }, [data, vm]) => {
  vm.assignmentState = true;
  vm.$q.loadingBar.start();

  let source = null;
  if (vm.cancelTokenArr) {
    const CancelToken = axios.CancelToken;
    source = CancelToken.source();
    vm.cancelTokenArr.push(source);
  }

  return new Promise((resolve, reject) => {
    axios
      .post("/assignment", {
        cancelToken: (source && source.token) || null,
        name: data.name,
        info: data.info,
        deadLine: data.deadLine
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      })
      .finally(() => {
        vm.assignmentState = false;
        vm.$q.loadingBar.stop();

        if (vm.cancelTokenArr) {
          const index = vm.cancelTokenArr.indexOf(source);
          if (index !== -1) {
            vm.cancelTokenArr.splice(index, 1);
          }
        }
      });
  });
};

const editAssignment = ({ commit, state }, [data, oldDeadLine, vm]) => {
  return new Promise((resolve, reject) => {
    vm.$q.loadingBar.start();
    axios
      .put("/assignment", {
        name: data.name,
        info: data.info,
        deadLine: data.deadLine,
        oldDeadLine: oldDeadLine
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      })
      .finally(() => {
        vm.$q.loadingBar.stop();
      });
  });
};

const removeAssignment = ({ commit, state }, [assignment, vm]) => {
  return new Promise((resolve, reject) => {
    vm.$q.loadingBar.start();
    axios
      .delete("/assignment", {
        params: {
          name: assignment.name,
          deadLine: assignment.deadLine
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      })
      .finally(() => {
        vm.$q.loadingBar.stop();
      });
  });
};
const getSelf = ({ commit, state }, vm, loadingBar = true) => {
  return new Promise((resolve, reject) => {
    loadingBar && vm.$q.loadingBar.start();
    axios
      .get("/user", {
        params: {
          id:
            (vm && vm.user && vm.user.id) ||
            (vm.$store.state.MainLayout.user &&
              vm.$store.state.MainLayout.user.id)
          //vm.user.id || vm.$store.state.MainLayout.user.id
        }
      })
      .then(res => {
        commit("user", res.data.data[0]);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
      .finally(() => {
        vm.$q.loadingBar.stop();
      });
  });
};

const editSelf = ({ commit, state }, [name, vm]) => {
  return new Promise((resolve, reject) => {
    vm.$q.loadingBar.start();
    axios
      .put("/user", {
        id: vm.user.id,
        name: name
      })
      .then(res => {
        commit("user", res.data.data[0]);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
      .finally(() => {
        vm.$q.loadingBar.stop();
      });
  });
};

const deleteSelf = ({ commit, state }, [password, vm]) => {
  vm.$q.loadingBar.start();
  return new Promise((resolve, reject) => {
    axios
      .delete("/user", {
        params: {
          id: vm.user.id,
          password: password
        }
      })
      .then(res => {
        //Log out operation here
        commit("login", false);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      })
      .finally(() => {
        vm.$q.loadingBar.stop();
      });
  });
};

//Home.vue 初始化
const init = ({ commit, state }, [vm, done]) => {
  return new Promise(async (resolve, reject) => {
    if (vm.initState) {
      return;
    }
    vm.initState = true;
    /************* 初始化今日时间 *************/
    let dateObject = vm.$formatTimeStamp(vm.$timeStampFloor(Date.now()));
    vm.date = vm.proxyDate = dateObject.format1();

    /************* 获取所有科目 *************/
    try {
      await vm.$store.dispatch("MainLayout/getAllSubjects", vm);
    } catch (e) {
      vm.$dealWithError(vm, e);
    }

    /**
     * 注意解耦
     */
    await refreshAssignment({ commit, state }, [vm]);

    //状态复原
    commit("refreshState", false);
    vm.initState = false;
    if (done) {
      done();
    }
    resolve();
  });
};
const getEvents = ({ commit, state }, [vm]) => {
  return new Promise(async (resolve, reject) => {
    vm.eventState = true;
    /************* 处理数据转为日历的events *************/
    let rowEvents = true;
    try {
      rowEvents = (await getAllAssignments({ commit, state }, vm, true)) || [];
      let arrEvents = [];
      let eventsLength = rowEvents.length;
      for (let i = 0; i < eventsLength; i++) {
        let date = vm.$formatTimeStamp(rowEvents[i].deadLine).format1();
        arrEvents[arrEvents.length] = date;
      }
      vm.events = arrEvents || vm.events;
    } catch (e) {
      vm.$dealWithError(vm, e);
      rowEvents = [];
    } finally {
      vm.eventState = false;
    }
    resolve();
  });
};

const refreshAssignment = ({ commit, state }, [vm, done]) => {
  return new Promise(async (resolve, reject) => {
    /************* 获取指定时间戳前的所有作业 *************/
    try {
      vm.data =
        (await vm.$store.dispatch("MainLayout/getAssignmentsInPeriod", [
          vm.days,
          vm
        ])) || vm.data;
    } catch (e) {
      vm.$dealWithError(vm, e);
    }
    if (done) {
      done();
    }
    resolve();
  });
};

const getAllUsers = ({ commit, state }, [vm, done]) => {
  vm.loadingState = true;
  vm.$q.loadingBar.start();

  let source = null;
  if (vm.cancelTokenArr) {
    const CancelToken = axios.CancelToken;
    source = CancelToken.source();
    vm.cancelTokenArr.push(source);
  }
  return new Promise((resolve, reject) => {
    axios
      .get("/user", {
        cancelToken: (source && source.token) || null
      })
      .then(res => {
        vm.$dealWithSuccess(vm, res.data);
        resolve(res);
      })
      .catch(e => {
        vm.$dealWithError(vm, e);
        reject();
      })
      .finally(() => {
        vm.loadingState = false;
        vm.$q.loadingBar.stop();

        if (vm.cancelTokenArr) {
          const index = vm.cancelTokenArr.indexOf(source);
          if (index !== -1) {
            vm.cancelTokenArr.splice(index, 1);
          }
        }
      });
    if (done) {
      done();
    }
  });
};

/**
 * 添加科目
 * @param { Object } payload
 */
const addSubject = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/subject", payload)
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

/**
 * 编辑科目
 * @param { Object } payload
 */
const editSubject = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put("/subject", payload)
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

/**
 * 查询科目
 * @param { Object } payload
 */
const getSubject = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/subject", { params: payload })
      .then(res => {
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

/**
 * 删除科目
 * @param { Object } payload
 */
const removeSubject = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete("/subject", { params: payload })
      .then(res => {
        console.log(res)
        resolve(res.data);
      })
      .catch(e => {
        console.log(e)
        reject(e);
      });
  });
};
export {
  getSingleAssignments,
  getAllAssignments,
  getAssignmentsInPeriod,
  addAssignment,
  editAssignment,
  removeAssignment,
  getEvents,
  getSelf,
  editSelf,
  deleteSelf,
  init,
  refreshAssignment,
  getAllUsers,
  addSubject,
  editSubject,
  getSubject,
  getAllSubjects,
  removeSubject
};
