/*-------------------------------Module-------------------------------*/
const EXPRESS = require('express')
const APP = EXPRESS();
const MIDDLEWARE = require('./middleware/index');
const COMPRESSION = require('compression');
const LISTEN = require('./LISTEN/index');
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
LISTEN.user(APP);

//Subject listening
LISTEN.subject(APP);

//Assignment listening
LISTEN.assignment(APP);

APP.listen(port, () => console.log(`Example APP listening on port ${port}!`))