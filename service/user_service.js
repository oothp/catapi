const User = require('../models/user')

async function getAll() {
    let users = await User.find({})
    if (!users) throw (err)

    return users
}

async function getById(params) {
    const user_id = params.id
    try {
        let user = await User.findOne({ _id: user_id }).populate('reviews')
        if (!user) throw ({ message: 'User not found' })
        
        return user

    } catch (err) {
        throw ({ message: 'User not found' })
    }
}

module.exports = {
    getAll,
    getById,
}