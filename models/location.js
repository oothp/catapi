const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    created_at: { type: String, default: Date.now },
    coordinates: [{ type: String }]
})

const Location = mongoose.model('Location', LocationSchema)
module.exports = Location
