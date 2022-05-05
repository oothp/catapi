const mongoose = require('mongoose')
// const Cat = require('./cat')

// Catloc schema
const CatlocSchema = new mongoose.Schema({
    created_at: { type: String, default: Date.now },
    seen_time: { type: Number },
    coordinates: [{ type: String }],
    country: { type: String }
})

const Catloc = mongoose.model('Catloc', CatlocSchema)
module.exports = Catloc
