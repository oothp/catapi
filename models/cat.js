const mongoose = require('mongoose')

const User = require('./user').schema
const Location = require('./location').schema

const CatSchema = new mongoose.Schema({
    name: String,
    description: String,
    will_scratch:  Boolean,
    created_at: { type:String, default: Date.now },
    locations: [ Location ],
    users: [ User ] // users  who met this cat
})

const Cat = mongoose.model('Cat', CatSchema)
module.exports = Cat
