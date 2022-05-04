const User = require('../models/user')
const ResourceNotFoundError = require('../errors/resource_not_found_error')
const BadRequestError = require('../errors/bad_request_error')

async function getAll() {
    let users = await User.find({})
    if (!users) throw new ResourceNotFoundError('Not found')

    return users
}

async function getById({ id }) {
    let user = await User.findOne({ _id: id }).populate('reviews')
    if (!user) throw new ResourceNotFoundError('User not found')

    return user
}

async function updateUser({ id }, { name, avatar }) {
    const update = { name: name, avatar: avatar }
    const options = { new: true, select: { name: 1, avatar: 1, _id: 0 } }

    let user = await User.findOneAndUpdate({ _id: id }, update, options)
    if (!user) throw new ResourceNotFoundError('User not found')

    return user
}

async function deleteUser({ id }) {
    const options = { select: { name: 1 } }
    let u = await User.findOneAndDelete({ _id: id }, options)
    if (!u) throw new ResourceNotFoundError('Failed to delete ' + id)

    return u
}

module.exports = {
    getAll,
    getById,
    updateUser,
    deleteUser
}