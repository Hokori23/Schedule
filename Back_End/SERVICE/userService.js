const ACTION = require('../ACTION/userAction');

//注册
const register = async(user) => {
    let res = {};
    try {
        let sqlRes = await ACTION.add(user);
        if (sqlRes.affectedRows > 0) {
            res.errcode = 0;
            res.data = await ACTION.queryNoPassWord(user.id);
            res.msg = '注册成功';
        } else {
            res.errcode = 2;
            res.msg = '账号已存在';
        }
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
}

//登录
const login = async(user) => {
    let res = {};
    try {
        let mayUser = await ACTION.query(user.id);
        if (mayUser.length) {
            if (mayUser[0].password === user.password) {
                res.errcode = 0;
                res.msg = '登陆成功';
                delete mayUser[0].password;
                res.data = mayUser;
                await ACTION.active(user);
            } else {
                res.errcode = 3;
                res.msg = '账号或密码错误';
            }
        } else {
            res.errcode = 2;
            res.msg = '账号不存在';
        }
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
}

//注销账号
const remove = async(user, operateID) => {
    let res = {};
    try {
        let operateUser = await ACTION.queryNoPassWord(operateID);
        let mayUser = await ACTION.query(user.id);
        //若操作员权限大于1
        if (operateUser.length && operateUser[0].power > 1) {
            if (mayUser.length) {
                res.errcode = 0;
                await ACTION.removeNoPassWord(user);
                res.msg = '注销成功';
            } else {
                res.errcode = 1;
                res.msg = '无此账号'
            }
        } else {
            //若操作员权限小于等于1
            if (mayUser.length) {
                if (mayUser[0].password === user.password) {
                    res.errcode = 0;
                    await ACTION.remove(user);
                    res.msg = '注销成功';
                } else {
                    res.errcode = 1;
                    res.msg = '密码错误';
                }
            } else {
                res.errcode = 1;
                res.msg = '无此账号'
            }
        }
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
}

//改
const edit = async(user) => {
    let res = {};
    try {
        res.errcode = 0;
        await ACTION.edit(user);
        res.data = await ACTION.queryNoPassWord(user.id);
        res.msg = '更改信息成功';
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
}

//查询
const query = async(id) => {
    let res = {};
    try {
        res.data = await ACTION.query(id);
        res.msg = '查询用户成功';
        res.errcode = 0;
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
}

//查询（不含密码）
const queryNoPassWord = async(id) => {
    let res = {};
    try {
        res.data = await ACTION.queryNoPassWord(id);
        res.msg = '查询用户成功';
        res.errcode = 0;
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
}

//遍历
const queryAll = async() => {
    let res = {};
    try {
        res.data = await ACTION.queryAll();
        res.msg = '遍历用户成功';
        res.errcode = 0;
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res;
}

//活跃
const active = async(user) => {
    let res = {};
    try {
        res.data = await ACTION.active(user);
        res.errcode = 0;
    } catch (e) {
        res.errcode = e.errno;
        res.msg = e.message;
    }
    return res
}

module.exports = { register, login, remove, edit, query, queryNoPassWord, queryAll, active }