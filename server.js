require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

//import mongoose
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// **************************************************

const routesCat = require("./routes/cat");
const routesReview = require("./routes/review");
const routesUser = require("./routes/user");

app.use("/", routesCat);
app.use("/", routesReview);
app.use("/", routesUser);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening on port " + listener.address().port);
});

//establish connection to database
mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
    if (err) {
        return console.log("Error: ", err)
    } else {
        console.log(
            "MongoDB Connection -- Ready state is:",
            mongoose.connection.readyState)
    }
});

// https://data.mongodb-api.com/app/data-mvpnp/endpoint/data/beta
