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

        res.status(201).send(authenticate(newUser))
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    let user = await User.findOne({ email: email }).select('+passwd')
    if (user) {
        let verified = await bcrypt.compare(password, user.passwd)
        if (verified) {
            res.status(200).send(authenticate(user))

        } else {
            return res.status(403).send({ Error: 'Wrong password' })
        }
    } else {
        return res.status(403).send({ Error: 'Email not found' })
    }
}

function authenticate(user) {
    const token = JWT.generateAccessToken(user._id)
    const rtoken = JWT.generateRefreshToken(user._id)

    let tokenExp = new Date().getTime() + JWT.tokenLifetime * 1000
    let rTokenExp = new Date().getTime() + JWT.rTokenLifetime * 1000

    let res = {
        user: {
            name: user.name,
            email: user.email,
            avatar: user.avatar
        },
        access_token: {
            token: token,
            expires: tokenExp
        },
        refresh_token: {
            token: rtoken,
            expires: rTokenExp
        }
    }
    return res
}

const refreshToken = async (req, res) => {
    const refreshToken = req.header("x-auth-token")

    // If token is not provided, send error message
    if (!refreshToken) {
        res.status(401).send({
            Error: "Token not found",
        })
    }

    if (!refreshToken.includes(refreshToken)) {
        res.status(403).json({
            msg: "Invalid refresh token",
        })
    }

    // ???? save refresh token somwehere for later verificaiton?
    try {
        const user = await JWT.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
        const { email } = user;
        const accessToken = await JWT.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
        );
        res.json({ accessToken });
    } catch (error) {
        res.status(403).json({
            errors: [
                {
                    msg: "Invalid token",
                },
            ],
        });
    }

    // res.json({ 'refresh_token': 'ok' })
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