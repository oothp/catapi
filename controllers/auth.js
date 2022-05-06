const service = require('../service/auth_service')
const errorHandler = require('../util/error_handler')

const register = (req, res) => {
    service.register(req.body)
    .then(data => { res.status(201).send(data) })
    .catch(err => { 
        console.error(err)
        errorHandler.processError(res, err)
    })
}

const login = (req, res) => {
    service.login(req.body)
    .then(data => { res.status(200).send(data) })
    .catch(err => { 
        console.error(err)
        errorHandler.processError(res, err)
    })
}

const refreshToken = (req, res) => {
    service.refresh(req)
    .then(data => { res.status(200).send(data) })
    .catch(err => {
        console.error(err)
        errorHandler.processError(res, err)
    })
}

module.exports = {
    register,
    login,
    refreshToken
}