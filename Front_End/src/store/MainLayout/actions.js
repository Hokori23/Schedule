import axios from "axios";

const getAllSubjects = ({ commit, state }, vm) => {
    if (!vm.$store.state.MainLayout.login) {
        return;
    }
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
                resolve(res.data.data);
            })
            .catch(e => {
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
    if (!vm.$store.state.MainLayout.login) {
        return;
    }
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
                console.log(e);
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
    if (!vm.$store.state.MainLayout.login) {
        return;
    }
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
                }
                resolve(data);
            })
            .catch(e => {
                console.log(e);
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

// const getSelf()
export { getAllSubjects, getAllAssignments, getAssignmentsInPeriod };