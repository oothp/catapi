// const mongoose = require("mongoose"), Schema = mongoose.Schema; 
const mongoose = require("mongoose"); //import mongoose

const User = require("./user");
const Review = require("./review");

// Comment schema
const CommentSchema = new mongoose.Schema({
    created_at: { type:String, default: Date.now },
    body: String,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    review: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Review" 
    },
});

const Comment = mongoose.model('Comment', CommentSchema); //convert to model named Comment
module.exports = Comment; //export for controller use
