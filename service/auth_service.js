const User = require('../models/user')
const validator = require('../util/validator')
const JWT = require('../util/jwt.js')
const bcrypt = require('bcryptjs')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')
const AuthError = require('../errors/auth_error')
const ResourceConflictError = require('../errors/resource_conflict_error')

async function register({ email, password, name, avatar }) {
    if (!validator.emailValid(email))
        throw AuthError('Invalid email')

    if (!validator.passwordValid(password))
        throw AuthError('Password needs to be at least 6 characters')

    let user = await User.findOne({ email: email }, {})
    if (user) { throw new ResourceConflictError('Email already exists') }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        name: name ?? generateRandomNickname(),
        email: email,
        passwd: hashedPassword,
        avatar: avatar ?? ""
    })
    let tokens = await JWT.getNewTokens(newUser._id)
    newUser.rToken = tokens.refresh_token
    await newUser.save()
    return {
        user: newUser,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
    }
}

async function login({ email, password }) {
    let user = await User.findOne({ email: email }).select('+passwd')//.populate('reviews').populate('comments')
    if (user) {
        let verified = await bcrypt.compare(password, user.passwd)
        if (verified) {
            let tokens = await JWT.getNewTokens(user._id)
            user.rToken = tokens.refresh_token
            await user.save()
            return {
                user,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token
            }
        } else {
            throw AuthError('Wrong password')
        }
    } else {
        throw AuthError('Email not found')
    }
}

async function refresh(req) {
    const refreshToken = req.header('x-refresh-token')
    if (!refreshToken) throw AuthError('Refresh token not found')

    try {
        let verified = await JWT.verify(refreshToken)
        let user = await User.findOne({ 'rToken.token': refreshToken })

        if (user) {
            let tokens = await JWT.getNewTokens(user._id)
            user.rToken = tokens.refresh_token
            await user.save()
            return { access_token: tokens.access_token, refresh_token: tokens.refresh_token }

        } else {
            throw AuthError('Refresh token ERROR !')
        }
    } catch (err) {
        throw AuthError(err.message) // refresh token invalid? ye
    }
}

function generateRandomNickname() {
    let shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2
    })
    shortName = shortName.replaceAll('_', ' ')
    return shortName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

module.exports = {
    register,
    login,
    refresh
}