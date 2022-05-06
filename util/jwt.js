const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const tokenLifetime = 7200 // '2h'
const rTokenLifetime = 5260000000 // '2m'

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

async function getNewTokens(payload) {
    const token = generateAccessToken(payload)
    const rtoken = generateRefreshToken(payload)

    let tokenExp = new Date().getTime() + tokenLifetime * 1000
    let rTokenExp = new Date().getTime() + rTokenLifetime * 1000

    let access_token = {
        token: token,
        expires: tokenExp
    }
    let refresh_token = {
        token: rtoken,
        expires: rTokenExp
    }
    return { access_token, refresh_token }
}

module.exports = {
    authenticateToken,
    generateAccessToken,
    generateRefreshToken,
    verify,
    tokenLifetime,
    rTokenLifetime,
    getNewTokens
}