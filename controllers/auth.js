const User = require('../models/user')
const validator = require('../util/validator')
const JWT = require('../util/jwt.js')
const bcrypt = require('bcryptjs')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')

const register = async (req, res) => {

    const { email, password, name, avatar } = req.body

    if (!validator.emailValid(email))
        return res.status(403).send({ Error: 'Invalid email' })

    if (!validator.passwordValid(password))
        return res.status(403).send({ Error: 'Password needs to be at least 6 characters' })

    // check if user exists
    let user = await User.findOne({ email: email }, {})

    if (user) {
        // 422 Unprocessable Entity: server understands the content type of the request entity
        // 200 Ok: Gmail, Facebook, Amazon, Twitter return 200 for user already exists
        return res.status(200).send({
            Error: 'Email already exists'
        })
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        name: name ?? generateRandomNickname(),
        email: email,
        passwd: hashedPassword,
        avatar: avatar ?? ""
    })

    newUser.save((err, user) => {
        if (err) return res.json({ Error: 'Could not create user' })

        let resJson = newTokensForUser(newUser)
        saveRefreshToken(user._id, resJson.refresh_token)
        res.status(201).send(resJson)
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    let user = await User.findOne({ email: email })
    if (user) {
        let verified = await bcrypt.compare(password, user.passwd)
        if (verified) {
            let resJson = await newTokensForUser(user)
            saveRefreshToken(user._id, resJson.refresh_token)
            res.status(200).send(resJson)

        } else {
            return res.status(403).send({ Error: 'Wrong password' })
        }
    } else {
        return res.status(403).send({ Error: 'Email not found' })
    }
}

function newTokensForUser(user) {
    const token = JWT.generateAccessToken(user._id)
    const rtoken = JWT.generateRefreshToken(user._id)

    let tokenExp = new Date().getTime() + JWT.tokenLifetime * 1000
    let rTokenExp = new Date().getTime() + JWT.rTokenLifetime * 1000

    let access_token = {
        token: token,
        expires: tokenExp
    }

    let refresh_token = {
        token: rtoken,
        expires: rTokenExp
    }

    return {
        user: {
            name: user.name,
            email: user.email,
            avatar: user.avatar
        },
        access_token,
        refresh_token
    }
}

function saveRefreshToken(user_id, t) {
    User.findOne({ _id: user_id }, (err, doc) => {
        doc.rToken = t
        doc.save()
    })
}

const refreshToken = async (req, res) => {

    const refreshToken = req.header('x-refresh-token')
    if (!refreshToken) res.status(401).send({ Error: 'Refresh token not found' })

    try {
        let verified = await JWT.verify(refreshToken)
        // console.log('verified: ', verified)

        const user = await User.findOne({ 'rToken.token': refreshToken })
        if (!user) {
            return res.status(401).send({ Error: 'Refresh token ERROR. Login again' })
        }

        let tokens = await newTokensForUser(user)
        saveRefreshToken(user._id, tokens.refresh_token)
        res.status(200).send({
            access_token: tokens.access_token, 
            refresh_token: tokens.refresh_token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
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
    refreshToken
}