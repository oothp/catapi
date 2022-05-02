const mongoose = require('mongoose')

const Review = require('./review')
const Comment = require('./comment')

// user schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwd: String,
    avatar: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    rToken: {
        token: String,
        expires: Number
    } 
})

UserSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.rToken
    delete obj.passwd
    delete obj.__v
    return obj
}

const User = mongoose.model('User', UserSchema) //convert to model named User
module.exports = User //export for controller use
