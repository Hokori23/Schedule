import axios from "axios";

const getAllSubjects = ({ commit, state }, vm) => {
    return new Promise((resolve, reject) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        vm.cancelTokenArr.push(source);

        vm.subjectState = true;
        vm.$q.loadingBar.start();

        axios
            .get("/subject", {
                cancelToken: source.token
            })
            .then(res => {
                //获取科目成功
                commit("subjects", res.data.data);
                resolve(res);
            })
            .catch(e => {
                if ((e.message = "取消请求")) {
                    resolve(null);
                }
                //获取科目失败
                reject(e);
            })
            .finally(() => {
                vm.subjectState = false;
                vm.$q.loadingBar.stop();
                const index = vm.cancelTokenArr.indexOf(source);
                if (index !== -1) {
                    vm.cancelTokenArr.splice(index, 1);
                }
            });
    });
};

const getAllAssignments = ({ commit, state }, vm) => {
    return new Promise((resolve, reject) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        vm.cancelTokenArr.push(source);

        vm.assignmentState = true;
        vm.$q.loadingBar.start();

        axios
            .get("/assignment", {
                cancelToken: source.token
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
                vm.assignmentState = false;
                vm.$q.loadingBar.stop();
                const index = vm.cancelTokenArr.indexOf(source);
                if (index !== -1) {
                    vm.cancelTokenArr.splice(index, 1);
                }
            });
    });
};

const getAssignmentsInPeriod = ({ commit, state }, [days, vm]) => {
    return new Promise((resolve, reject) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        vm.cancelTokenArr.push(source);
        vm.assignmentState = true;
        vm.$q.loadingBar.start();

        let nowFloorTimeStamp = vm.$timeStampFloor();

        axios
            .get("/assignment", {
                cancelToken: source.token,
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
                const index = vm.cancelTokenArr.indexOf(source);
                if (index !== -1) {
                    vm.cancelTokenArr.splice(index, 1);
                }
            });
    });
};
const addAssignment = ({ commit, state }, [data, vm]) => {
    return new Promise((resolve, reject) => {
        axios
            .post("/assignment", {
                name: data.name,
                info: data.info,
                deadLine: data.deadLine
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(e => {
                reject(e);
            });
    });
};

const getSelf = ({ commit, state }, vm) => {
    return new Promise((resolve, reject) => {
        axios
            .get("/user", {
                params: {
                    id: vm.user.id
                }
            })
            .then(res => {
                commit("user", res.data.data[0]);
                resolve(res);
            })
            .catch(e => {
                reject(e);
            });
    });
};

const editSelf = ({ commit, state }, [name, vm]) => {
    return new Promise((resolve, reject) => {
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
            });
    });
};

const deleteSelf = ({ commit, state }, [password, vm]) => {
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
            });
    });
};
export {
    getAllSubjects,
    getAllAssignments,
    getAssignmentsInPeriod,
    addAssignment,
    getSelf,
    editSelf,
    deleteSelf
};
