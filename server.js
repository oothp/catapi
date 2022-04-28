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

// middleware for authenticating token submitted with requests
jwtauth.authenticateToken.unless = unless
app.use(jwtauth.authenticateToken.unless({
    path: [
        { url: '/api/auth/login', methods: ['POST']},
        { url: '/api/auth/register', methods: ['POST']}
    ]
}))

app.use("/api", routesCat)
app.use("/api", routesReview)
app.use("/api", routesUser)
app.use('/api', routesAuth)

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