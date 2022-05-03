const User = require('../models/user')

function getAll() {
    let users = User.find({})
    if (!users) throw (err)

    return users
}

function getById(params) {
    const user_id = params.id
    let user = User.findOne({ _id: user_id }).populate('reviews')
    if (!user) throw (err)

    return user
}

module.exports = {
    getAll,
    getById,

}