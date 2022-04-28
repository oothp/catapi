const User = require("../models/user")
const validator = require('../util/validator')
const jwtauth = require('../util/jwt.js')
const bcrypt = require('bcryptjs')

const register = (req, res, next) => {

    if (validator.emailValid(req.body.email) && validator.passwordValid(req.body.password)) {
        User.findOne({ email: req.body.email }, (err, data) => {
            if (data) res.status(401).send({ "message": "Email already in use" })

            hashPassword(req.body.password)
                .then(hashedPasswd => {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        passwd: hashedPasswd,
                        avatar: req.body.avatar,
                    })

                    newUser.save((err, user) => {
                        if (err) return res.json({ Error: "Could not create user" })

                        const token = jwtauth.generateAccessToken(newUser._id)
                        res.status(201).send({ "token": token })
                    })
                })
                .catch(err => { console.log('hashed passwd ERROR', err) })
        })

    } else {
        res.status(403).send({ "message": "Invalid email or password" })
    }
}

const login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        const verified = bcrypt.compareSync(req.body.password, user.passwd)
        if (verified) {
            const token = jwtauth.generateAccessToken(user._id)
            res.status(201).send({ "token": token })
        } else {
            res.status(403).send({ "Message": "Wrong password" })
        }
    })
    .catch(err => { console.error("=== error!", err) })
}

const refreshToken = (req, res) => {
    res.json({ "refreshToken": "ok" })
}

async function hashPassword(passwd) {
    let hashedPassword 
    try {
        hashedPassword = await bcrypt.hash(passwd, 12)
        return hashedPassword
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    register,
    login,
    refreshToken
}