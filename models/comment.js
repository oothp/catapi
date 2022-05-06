const mongoose = require('mongoose')

const User = require('./user')
const Review = require('./review')

const CommentSchema = new mongoose.Schema({
    created_at: { type: String, default: Date.now },
    body: String,
    photo: String,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    review: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Review" 
    },
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment
