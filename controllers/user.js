const service = require('../service/user_service')

const getAllUsers = (req, res) => {
    service.getAll()
        .then(users => { res.status(200).send(users) })
        .catch(err => {
            console.log(err)
            sendError(res, err)
        })
}

const getUserById = (req, res) => {
    service.getUserById(req.params, req.body)
        .then(user => { res.status(200).send(user) })
        .catch(err => {
            console.error(err)
            sendError(res, err)
        })
}

const updateUser = (req, res) => {
    service.updateUser(req.params, req.body)
        .then(user => { res.status(200).send(user) })
        .catch(err => {
            console.error(err)
            sendError(res, err)
        })
}

const deleteUser = (req, res) => {
    service.deleteUser(req.params)
        .then(u => { res.status(200).send({ 'Deleted': u }) })
        .catch(err => {
            console.error(err)
            sendError(res, err)
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}


function sendError(res, err) {
    res.status(err.status)
        .send({
            Error: err.message
        })
}

