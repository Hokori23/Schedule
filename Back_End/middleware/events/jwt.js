const SERVICE = require('../../SERVICE/userService');
const jwt = require('jwt-simple');
//秘钥
const jwtSecret = "Hokori-homework";
//过期时间
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7; //7天

//加密函数
const encode = (obj) => {
    obj && (obj.expires = Date.now() + tokenExpiresTime);
    return jwt.encode(obj, jwtSecret);
};

//解密函数
const decode = (token) => {
    return jwt.decode(token, jwtSecret);
};

const checkAndSpawn = async(req, res, next) => {
    console.log("----------------------------------");
    let time = Date.now();
    let jwt = req.get("Authorization");
    if (jwt) {
        //解密jwt
        let decoded = decode(jwt);

        //检查jwt有限期
        if (decoded.expires <= time) {
            res.status(401).end();
            return;
        }

        //检查jwt真实性
        let queryResult = await SERVICE.query(decoded.jti);
        if (queryResult.errcode === 0 && queryResult.data.length) {
            decoded.name = queryResult.data[0].name;
        } else if (!queryResult.data.length) {
            //jwt为假
            res.status(401).end();
            return;
        }

        //未过期，更新并加密JWT
        let jwt = encode(decoded);

        //改变活跃时间
        SERVICE.active({
            activatedTime: time,
            id: decoded.jti,
        });

        res.set("Authorization", jwt);

        //将id附带到req上
        req.user_id = decoded.jti;
        req.user_name = decoded.name;
        console.log(`账号: ${decoded.jti}`, `昵称: ${decoded.name}`);
    } else {
        let id = req.query && req.query.id || req.body && req.body.id;
        if (id) {
            //设置JWT
            console.log(id, "获取jwt");
            let queryResult = await SERVICE.query(id);
            if (queryResult.errcode === 0) {
                let jwt = {};
                if (queryResult.data.length) {
                    jwt = {
                        iss: 'Hokori-Nodejs-Server',
                        jti: queryResult.data[0].id,
                        name: queryResult.data[0].name,
                        expires: time + tokenExpiresTime
                    }
                } else {
                    //无此账号
                    jwt = {
                        iss: 'Hokori-Nodejs-Server',
                        jti: 'null',
                        expires: time + tokenExpiresTime
                    }
                }
                jwt = encode(jwt);
                res.set('Authorization', jwt);
                next()
            } else {
                res.status(401).end()
            }
        } else {
            res.status(401).end()
        }
    }
}

module.exports = checkAndSpawn