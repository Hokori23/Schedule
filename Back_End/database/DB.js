const MYSQL = require('mysql2');
const SETTINGS = require('./setting')

const DB = async() => {
    try {
        const connection = await MYSQL.createConnection(SETTINGS);
        await connection.connect((err) => {
            if (err) {
                reject(err)
            }
            //  else {
            //     console.log('connected as id ' + connection.threadId)
            // }
        })
        return connection;
    } catch (e) {
        console.log('连接数据库失败')
    }
}
module.exports = DB