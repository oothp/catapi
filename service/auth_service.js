const User = require('../models/user')
const validator = require('../util/validator')
const JWT = require('../util/jwt.js')
const res = require('express/lib/response')
const bcrypt = require('bcryptjs')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')

async function register({ email, password, name, avatar }) {
    if (!validator.emailValid(email))
        throw ({ status: 403, message: 'Invalid email' })

    if (!validator.passwordValid(password))
        throw ({ status: 403, message: 'Password needs to be at least 6 characters' })

    let user = await User.findOne({ email: email }, {})
    if (user) {
        throw ({ status: 200, message: 'Email already exists' })
        // 422 Unprocessable Entity: server understands the content type of the request entity
        // 200 Ok: Gmail, Facebook, Amazon, Twitter return 200 for user already exists
    }

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
    return { newUser, 
        access_token: tokens.access_token, 
        refresh_token: tokens.refresh_token 
    }
}

async function login({ email, password }) {
    let user = await User.findOne({ email: email })
    if (user) {
        let verified = await bcrypt.compare(password, user.passwd)
        if (verified) {
            let tokens = await JWT.getNewTokens(user._id)
            user.rToken = tokens.refresh_token
            await user.save()
            return { user, 
                access_token: tokens.access_token, 
                refresh_token: tokens.refresh_token 
            }
        } else {
            throw ({ status: 403, message: 'Wrong password' })
        }
    } else {
        throw ({ status: 403, message: 'Email not found' })
    }
}

async function refresh(req) {
    const refreshToken = req.header('x-refresh-token')
    if (!refreshToken) throw ({ status: 401, message: 'Refresh token not found' })

    try {
        let verified = await JWT.verify(refreshToken)
        // console.log('verified: ', verified)
        let user = await User.findOne({ 'rToken.token': refreshToken })

        if (user) {
            let tokens = await JWT.getNewTokens(user._id)
            user.rToken = tokens.refresh_token
            await user.save()
            return { access_token: tokens.access_token, refresh_token: tokens.refresh_token }

        } else {
            throw ({ status: 401, message: 'Refresh token ERROR !' })
        }
    } catch (err) {
        throw ({ status: 401, message: err.message})
    }
}

function generateRandomNickname() {
    let shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2
    })
    shortName = shortName.replaceAll('_', ' ')
    return shortName.charAt(0).toUpperCase() + shortName.slice(1)
}

module.exports = {
    register,
    login,
    refresh
}