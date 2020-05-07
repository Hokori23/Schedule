const setHeaders = async(req, res, next) => {
    res.set({
        'Cache-Control': 'no-cache',
    })
    next()
}

module.exports = setHeaders