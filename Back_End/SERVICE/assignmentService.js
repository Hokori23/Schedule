const ACTION = require("../ACTION/assignmentAction");
const USER_SERVICE = require("./userService");

//检查权限
const getPower = async(id) => {
    try {
        let queryUser = await USER_SERVICE.query(id);
        if (queryUser.data[0].power >= 1) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        throw e;
    }
};

//添加作业
const add = async(user, assignment) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        if (await getPower(user.id)) {
            let queryAssign = await ACTION.queryNameAndDeadLine(assignment);
            console.log(queryAssign);
            if (queryAssign.length) {
                res.errcode = 1;
                res.data = queryAssign;
                res.msg = "已有该日作业，是否查看？";
            } else {
                await ACTION.add(assignment);
                res.errcode = 0;
                res.data = await ACTION.queryNameAndDeadLine(assignment);
                res.msg = "添加作业成功";
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

//删除作业
const remove = async(user, assignment) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        if (await getPower(user.id)) {
            let sqlRes = await ACTION.remove(assignment);
            if (sqlRes.affectedRows > 0) {
                res.errcode = 0;
                res.msg = "删除作业成功";
            } else {
                res.errcode = 2;
                res.msg = "无此日作业";
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

//编辑作业
const edit = async(user, assignment) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        if (await getPower(user.id)) {
            let sqlRes = await ACTION.edit(assignment);
            if (sqlRes.affectedRows > 0) {
                res.errcode = 0;
                res.msg = "编辑作业成功";
            } else {
                res.errcode = 2;
                res.msg = "编辑作业失败";
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

//查询某个科目所有作业
const query = async(user, name) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        res.errcode = 0;
        res.data = await ACTION.query(name);
        res.msg = "查询作业成功";
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
};

//查询某个科目在deadLine前的所有作业
const queryNameBeforeDeadLine = async(user, name, deadLine) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        res.errcode = 0;
        res.data = await ACTION.queryNameBeforeDeadLine(name, deadLine);
        res.msg = "查询作业成功";
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
};

//查询全部科目在deadLine前的所有作业
const queryBeforeDeadLine = async(user, name) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        res.errcode = 0;
        res.data = await ACTION.queryBeforeDeadLine(name);
        res.msg = "查询作业成功";
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
};

//遍历作业
const queryAll = async(user) => {
    let res = {};
    try {
        await USER_SERVICE.active(user);
        res.errcode = 0;
        res.data = await ACTION.queryAll();
        res.msg = "遍历作业成功";
    } catch (e) {
        res.errcode = 1;
        res.msg = "遍历作业失败";
    }
    return res;
};

module.exports = {
    add,
    remove,
    edit,
    query,
    queryNameBeforeDeadLine,
    queryBeforeDeadLine,
    queryAll,
};