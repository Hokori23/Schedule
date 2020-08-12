const setHeaders = async(req, res, next) => {
    res.set({
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Expose-Headers": "Authorization"
    });
    // "Access-Control-Allow-Origin": "https://hokori.online",
    // 'Access-Control-Allow-Origin': "https://assignment.hokori.online",
    if (req.method.toLowerCase() == "options") {
        res.status(200).end(); // 让options尝试请求快速结束
    } else {
        next();
    }
};

module.exports = setHeaders;