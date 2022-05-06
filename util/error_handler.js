function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err })
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).send({
            Error: 'ValidationError ' + err.message ?? ''
        })
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).send({
            Error: 'UnauthorizedError Token not valid'
        })
    }

    // default to 500 server error
    return res.status(500).send({
        Error: 'ServerError ' + err.message ?? ''
    })
}

function processError(res, err) {
    res.status(err.status ?? 400)
        .send({
            Error: '[' + err.name + '] ' + err.message ?? ''
        })
}

module.exports = {
    errorHandler,
    processError
}