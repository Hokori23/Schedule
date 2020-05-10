/*-------------------------------Module-------------------------------*/
const EXPRESS = require('express')
const APP = EXPRESS();
const MIDDLEWARE = require('./middleware/index');
const COMPRESSION = require('compression');
const USER_LISTEN = require('./LISTEN/userListen');
const SUBJECT_LISTEN = require('./LISTEN/subjectListen');
const ASSIGN_LISTEN = require('./LISTEN/assignmentListen');
APP.set('env', 'development');
// APP.set('env','production');
const port = 8000

/*-------------------------------Middle Ware-------------------------------*/

//IP Proxy
// APP.set('trust proxy','loopback');

//parse application/x-www-form-urlencoded
APP.use(EXPRESS.urlencoded({ extended: true }))

//parse application/json
APP.use(EXPRESS.json())

//JWT
APP.use(MIDDLEWARE.jwt)

//reqTime
APP.use(MIDDLEWARE.reqTime)

//setHeaders
APP.use(MIDDLEWARE.setHeaders)

//GZIP
APP.use(COMPRESSION())

//User listening
USER_LISTEN(APP);

//Subject listening
SUBJECT_LISTEN(APP);

//Assignment listening
ASSIGN_LISTEN(APP);

APP.listen(port, () => console.log(`Example APP listening on port ${port}!`))