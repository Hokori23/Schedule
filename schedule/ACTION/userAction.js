const DB = require('../database/DB.js')

//增
/* @user user
 * @String id
 * @String name
 * @String createdTime
 * @String activatedTime
 * @Number power
 */
const add = (user) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'INSERT INTO user VALUES(?,?,?,?,?,?)';
        let params = user.destruct()
        let db = await DB();
        db.query(sql, params, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//管理员注销
const removeNoPassWord = (user) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'DELETE FROM user WHERE id = ?';
        let db = await DB();
        db.query(sql, [user.id], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//通过密码注销
const remove = (user) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'DELETE FROM user WHERE id = ? AND password = ?';
        let db = await DB();
        db.query(sql, [user.id, user.password], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//改变活跃时间
/* @userLogin user
 * @String id
 * @String activatedTime
 */
const active = (user) => {
    return new Promise(async(resolve, reject) => {
        let sql = ` UPDATE user SET activatedTime = ?
                                WHERE id = ?`;
        let db = await DB();
        db.query(sql, [user.activatedTime, user.id], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//改
/* @user user
 * @String id
 * @String name
 * @String activatedTime
 */
const edit = (user) => {
    return new Promise(async(resolve, reject) => {
        let sql = ` UPDATE user SET name = ?,
                                    activatedTime = ?
                                WHERE id = ?`;
        let params = user.destruct();
        let db = await DB();
        db.query(sql, params, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//查询
const query = (id) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'SELECT * FROM user WHERE id = ?';
        let db = await DB();
        db.query(sql, [id], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//查询（不含密码）
const queryNoPassWord = (id) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'SELECT id,name,activatedTime,createdTime,power FROM user WHERE id = ?';
        let db = await DB();
        db.query(sql, [id], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//遍历
const queryAll = () => {
    return new Promise(async(resolve, reject) => {
        let sql = 'SELECT id,name,activatedTime,createdTime,power FROM user';
        let db = await DB();
        db.query(sql, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

module.exports = { add, remove, removeNoPassWord, active, edit, query, queryNoPassWord, queryAll }