const mongoose = require('mongoose')

const Review = require('./review')
const Comment = require('./comment')

const TokenSchema = new mongoose.Schema({
    token: String,
    expires: Number
})

// user schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwd: { type: String, select: false },
    avatar: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    rToken: { type: TokenSchema, select: false }
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
