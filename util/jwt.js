const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const tokenLifetime = 7200 // '2h'
const rTokenLifetime = 604800 // '7d'

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}

function generateAccessToken(payload) {
    return jwt.sign(
        { data: payload }, 
        process.env.TOKEN_SECRET, 
        { expiresIn: tokenLifetime }
    );
}

function generateRefreshToken(payload) {
    return jwt.sign(
        { data: payload }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: rTokenLifetime }
    );
}

function verify(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = {
    authenticateToken,
    generateAccessToken,
    generateRefreshToken,
    verify,
    tokenLifetime,
    rTokenLifetime
}