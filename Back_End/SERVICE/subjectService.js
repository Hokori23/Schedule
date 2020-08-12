const ACTION = require("../ACTION/subjectAction");
const USER_SERVICE = require("./userService");

//检查权限
const getPower = async(id) => {
    try {
        let queryUser = await USER_SERVICE.query(id);
        if (queryUser.data[0].power >= 2) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        throw e;
    }
};

//添加科目
const add = async(user, subject) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        if (await getPower(user.id)) {
            let querySubject = await ACTION.query(subject.name);
            if (querySubject.length) {
                res.errcode = 20100;
                res.data = querySubject;
                res.msg = "科目已存在";
            } else {
                await ACTION.add(subject);
                res.errcode = 20000;
                res.data = await ACTION.query(subject.name);
                res.msg = "添加科目成功";
            }
        } else {
            return false;
        }
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
};

//删除科目
const remove = async(user, name) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        if (await getPower(user.id)) {
            let querySubject = await ACTION.query(name);
            if (querySubject.length) {
                await ACTION.remove(name);
                res.errcode = 20001;
                res.msg = "删除科目成功";
            } else {
                res.errcode = 20101;
                res.msg = "科目不存在";
            }
        } else {
            return false;
        }
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
};

//编辑科目
const edit = async(user, subject, oldname) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        if (await getPower(user.id)) {
            let querySubject = await ACTION.query(oldname);
            if (querySubject.length) {
                await ACTION.edit(subject, oldname);
                res.errcode = 20002;
                res.data = await ACTION.query(subject.name);
                res.msg = "编辑科目成功";
            } else {
                res.errcode = 20102;
                res.msg = "编辑科目失败";
            }
        } else {
            return false;
        }
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
};

//查询科目
const query = async(user, name) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        res.errcode = 0;
        res.data = await ACTION.query(name);
        res.errcode = 20003;
        res.msg = "查询科目成功";
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
};

//遍历
const queryAll = async(user) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        res.errcode = 20004;
        res.data = await ACTION.queryAll();
        res.msg = "遍历科目成功";
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
};

module.exports = { add, remove, edit, query, queryAll };