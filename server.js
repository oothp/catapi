require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const unless = require('express-unless')

const errors = require('./util/error_handler.js')
const jwtauth = require('./util/jwt.js')

app.use(express.json())
app.use(bodyParser.json())

app.use(errors.errorHandler)
// app.use(bodyParser.urlencoded({ extended: true }));

// **************************************************

const routesCat = require("./routes/cat")
const routesReview = require("./routes/review")
const routesUser = require("./routes/user")
const routesAuth = require('./routes/auth')

const apiPrefix = '/api/' + process.env.VERSION

// middleware for authenticating token submitted with requests
jwtauth.authenticateToken.unless = unless
app.use(jwtauth.authenticateToken.unless({
    path: [
        { url: apiPrefix + '/auth/login', methods: ['POST']},
        { url: apiPrefix + '/auth/register', methods: ['POST']},
        { url: apiPrefix + '/', methods: ['GET']}
    ]
}))

app.use(apiPrefix, routesCat)
app.use(apiPrefix, routesReview)
app.use(apiPrefix, routesUser)
app.use(apiPrefix, routesAuth)

const listener = app.listen(process.env.PORT || 8000, () => {
    console.log("App is listening on port " + listener.address().port)
})

//establish connection to database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(
            "MongoDB Connection -- Ready state is:",
            mongoose.connection.readyState)
    })
    .catch(err => console.log("Mongoose Connect Error: ", err))