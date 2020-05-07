const DB = require('../database/DB.js')

//增
const add = (subject) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'INSERT INTO subject VALUES(?,?)';
        let params = subject.destruct();
        let db = await DB();
        db.query(sql, params, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        })
        db.end();
    })
}

//删
const remove = (name) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'DELETE FROM subject WHERE name = ?';
        let db = await DB();
        db.query(sql, [name], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//改
const edit = (subject, oldname) => {
    return new Promise(async(resolve, reject) => {
        let sql = ` UPDATE subject SET  name = ?,
                                        type = ?
                                WHERE name = ?`;
        let params = subject.destruct();
        let db = await DB();
        db.query(sql, [...params, oldname], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end();
    })
}

//查
const query = (name) => {
    return new Promise(async(resolve, reject) => {
        let sql = 'SELECT * FROM subject WHERE name = ?';
        let db = await DB();
        db.query(sql, [name], (err, res) => {
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
        let sql = 'SELECT * FROM subject';
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

module.exports = { add, remove, edit, query, queryAll }