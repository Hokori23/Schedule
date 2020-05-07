const DB = require('../database/DB.js')

//增
const add = (assignment) => {
    return new Promise(async(resolve, reject) => {
        let sql = ` INSERT INTO assignment
                    VALUES(?,?,?,?,?)`;
        let params = assignment.destruct();
        let db = await DB();
        db.query(sql, params, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end()
    })
}

//删
/*
 * @assignmentDelete assignment
 * @String name
 * @String deadLine
 */
const remove = (assignment) => {
    return new Promise(async(resolve, reject) => {
        let sql = ` DELETE FROM assignment 
                    WHERE (name = ?) AND (deadLine = ?)`;
        let params = assignment.destruct();
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

//改
/*
 * @assignmentEdit assignment
 * @String name
 * @String info
 * @String deadLine
 * @String lastModified
 * @String author
 */
const edit = (assignment) => {
    return new Promise(async(resolve, reject) => {
        let sql = `UPDATE assignment SET    info = ?,
                                            lastModified = ?,
                                            author = ?
                                    WHERE (name = ?) AND (deadLine = ?)`;
        let params = assignment.destruct();
        console.log(params)
        let db = await DB();
        db.query(sql, params, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end()
    })
}

//通过科目名查询
const query = (name) => {
    return new Promise(async(resolve, reject) => {
        let sql = ` SELECT * FROM assignment
                    WHERE name = ?`;
        let db = await DB();
        db.query(sql, [name], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end()
    })
}

//通过科目名和期限查询
const queryNameAndDeadLine = (assignment) => {
    return new Promise(async(resolve, reject) => {
        let sql = `SELECT * FROM assignment
                                    WHERE   (name = ?) 
                                    AND     (deadLine = ?)`;
        let db = await DB();
        db.query(sql, [assignment.name, assignment.deadLine], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end()
    })
}

//遍历
const queryAll = () => {
    return new Promise(async(resolve, reject) => {
        let sql = 'SELECT * FROM assignment';
        let db = await DB();
        db.query(sql, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
        db.end()
    })
}

module.exports = { add, remove, edit, query, queryNameAndDeadLine, queryAll }