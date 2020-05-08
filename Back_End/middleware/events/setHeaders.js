const setHeaders = async(req, res, next) => {
    res.set({
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    next()
}

module.exports = setHeaders