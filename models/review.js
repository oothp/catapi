const mongoose = require('mongoose')

const User = require('./user')
const Cat = require('./cat')
const Location = require('./location')
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
    comments: [Comment],
    photos: [String],
    created_at: { type: String, default: Date.now },
    is_author: { type: Boolean, default: false } // for deleting/editing reviews?
})

ReviewSchema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.user._id
    delete obj.user.reviews
    delete obj.user.comments
    delete obj.user.__v
    delete obj.cat._id
    delete obj.cat.__v
    delete obj.__v
    return obj
}

const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review
