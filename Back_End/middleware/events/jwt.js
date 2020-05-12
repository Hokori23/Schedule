const SERVICE = require("../../SERVICE/userService");
const jwt = require("jwt-simple");
//秘钥
const jwtSecret = "Hokori-homework";
//过期时间
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7; //7天
const encode = (obj) => {
    obj && (obj.expires = Date.now() + tokenExpiresTime);
    return jwt.encode(obj, jwtSecret);
};
const decode = (token) => {
    return jwt.decode(token, jwtSecret);
};
const checkAndSpawn = async(req, res, next) => {
    let time = Date.now();
    let jwt = req.get("Authorization");
    if (jwt) {
        let decoded = decode(jwt);
        if (decoded.expires <= time || decoded.jti === "null") {
            res.status(401).end();
        } else {
            //检查jwt真实性
            let queryResult = await SERVICE.query(decoded.jti);
            if (queryResult.errcode === 0 && queryResult.data.length) {
                decoded.name = queryResult.data[0].name;
            } else if (!queryResult.data.length) {
                res.status(402).end();
                return;
            }
            //重新加密jwt
            //未过期，更新JWT
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
            next();
        }
    } else {
        let id = (req.query && req.query.id) || (req.body && req.body.id);
        if (id) {
            //设置JWT
            let queryResult = await SERVICE.query(id);
            if (queryResult.errcode === 10000) {
                if (queryResult.data.length) {
                    let jwt = {
                        iss: "Hokori-Nodejs-Server",
                        jti: queryResult.data[0].id,
                        name: queryResult.data[0].name,
                        expires: time + tokenExpiresTime,
                    };
                    jwt = encode(jwt);
                    res.set("Authorization", jwt);
                }
            }
        } else {
            console.log("游客访问");
        }
        next();
    }
};

module.exports = checkAndSpawn;