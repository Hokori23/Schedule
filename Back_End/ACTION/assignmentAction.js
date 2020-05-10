const DB = require("../database/DB.js");

//增
const add = (assignment) => {
    return new Promise(async(resolve, reject) => {
        let sql = ` INSERT INTO assignment
                    VALUES(?,?,?,?,?)`;
        let params = assignment.destruct();
        let db = await DB();
        db.query(sql, params, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

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
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

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
        let db = await DB();
        db.query(sql, params, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//通过科目名查询
const query = (name) => {
    return new Promise(async(resolve, reject) => {
        let sql = ` SELECT * FROM assignment
                    WHERE name = ?`;
        let db = await DB();
        db.query(sql, [name], (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//通过科目名和期限查询
const queryNameAndDeadLine = (assignment) => {
    return new Promise(async(resolve, reject) => {
        let sql = `SELECT * FROM assignment
                                    WHERE   (name = ?) 
                                    AND     (deadLine = ?)`;
        let db = await DB();
        console.log(assignment.name);
        db.query(sql, [assignment.name, assignment.deadLine], (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//查询某个科目在deadLine前的所有作业
const queryNameBeforeDeadLine = (name, deadLine) => {
    return new Promise(async(resolve, reject) => {
        let sql = `SELECT * FROM assignment
                                    WHERE   (name = ?) 
                                    AND     (deadLine < ?)`;
        let db = await DB();
        db.query(sql, [name, deadLine], (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//查询某个科目在startLine后的所有作业
const queryNameAfterStartLine = (name, startLine) => {
    return new Promise(async(resolve, reject) => {
        let sql = `SELECT * FROM assignment
                                    WHERE   (name = ?) 
                                    AND     (deadLine > ?)`;
        let db = await DB();
        db.query(sql, [name, startLine], (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//查询某个科目在period的所有作业
const queryNameInPeriod = (name, startLine, deadLine) => {
    return new Promise(async(resolve, reject) => {
        let sql = `SELECT * FROM assignment
                                    WHERE   (name = ?) 
                                    AND     (deadLine BETWEEN ? AND ?)`;
        let db = await DB();
        db.query(sql, [name, startLine, deadLine], (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//查询全部科目在deadLine前的所有作业
const queryBeforeDeadLine = (deadLine) => {
    return new Promise(async(resolve, reject) => {
        let sql = `SELECT * FROM assignment
                                    WHERE     (deadLine < ?)`;
        let db = await DB();
        db.query(sql, [deadLine], (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//查询全部科目在startLine后的所有作业
const queryAfterStartLine = (startLine) => {
    return new Promise(async(resolve, reject) => {
        let sql = `SELECT * FROM assignment
                                    WHERE     (deadLine > ?)`;
        let db = await DB();
        db.query(sql, [startLine], (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//查询全部科目在period的所有作业
const queryInPeriod = (startLine, deadLine) => {
    return new Promise(async(resolve, reject) => {
        let sql = `SELECT * FROM assignment
                                    WHERE   (deadLine BETWEEN ? AND ?)`;
        let db = await DB();
        db.query(sql, [startLine, deadLine], (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

//遍历
const queryAll = () => {
    return new Promise(async(resolve, reject) => {
        let sql = "SELECT * FROM assignment";
        let db = await DB();
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
        db.end();
    });
};

module.exports = {
    add,
    remove,
    edit,
    query,
    queryNameAndDeadLine,
    queryNameBeforeDeadLine,
    queryNameAfterStartLine,
    queryNameInPeriod,
    queryBeforeDeadLine,
    queryAfterStartLine,
    queryInPeriod,
    queryAll,
};