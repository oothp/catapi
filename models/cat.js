const mongoose = require("mongoose"); //import mongoose

const User = require("./user").schema
const Location = require("./location").schema
// const PictureInfo = require("./picture_info");


const CatSchema = new mongoose.Schema({
    name: String,
    description: String,
    will_scratch:  Boolean,
    created_at: { type:String, default: Date.now },
    locations: [ Location ],
    users: [ User ] // users  who met this cat
})

const Cat = mongoose.model("Cat", CatSchema); //convert to model named Cat
module.exports = Cat; //export for controller use
