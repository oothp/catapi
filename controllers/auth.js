const service = require('../service/auth_service')

const register = async (req, res) => {
    service.register(req.body)
    .then(data => { res.status(201).send(data) })
    .catch(err => { 
        console.error('error', err)
        if (err.reason) {
            res.status(200).send({ Error: 'Email already exists' })
        }
        res.status(401).send({ Error: err.message })
    })
}

const login = async (req, res) => {
    service.login(req.body)
    .then(data => { res.status(200).send(data) })
    .catch(err => { 
        console.error('error', err)
        res.status(401).send({ Error: err.message })
    })
}

const refreshToken = async (req, res) => {
    service.refresh(req)
    .then(data => { res.status(200).send(data) })
    .catch(err => {
        console.error('error', err)
        res.status(401).send({ Error: err.message })
    })
}

module.exports = {
    register,
    login,
    refreshToken
}