//const dateFormat = require('dateformat');
const reqTime = (req, res, next) => {
    req.reqTime = Date.now();
    let time = new Date();
    console.log('Request Time:', time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日-----' + time.getHours() + '时' + time.getMinutes() + '分');
    let ip = req.header('x-forwarded-for') || '';
    console.log('IP:', ip.split(',') || '')
    next();
}
module.exports = reqTime