const mongoose = require('mongoose')

const User = require('./user')
const Cat = require('./cat')
const Location = require('./location')
const PictureInfo = require('./picture_info').schema
const Comment = require('./comment').schema

const ReviewSchema = new mongoose.Schema({
    rating: Number,
    would_pet: Boolean,
    cat: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cat'
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    location: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location'
    },
    comments: [ Comment ],
    photos: [ PictureInfo ],
    created_at: { type:String, default: Date.now }
})

ReviewSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.__v
    return obj
}

const Review = mongoose.model('Review', ReviewSchema) //convert to model named Review
module.exports = Review //export for controller use
