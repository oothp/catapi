const mongoose = require("mongoose"); //import mongoose
const Review = require("./review");

// PictureInfo schema
const PictureInfoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created_at: { type:String, default: new Date() },
    url: { type: String },
    review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" }
});

const PictureInfo = mongoose.model('PictureInfo', PictureInfoSchema); //convert to model named PictureInfo
module.exports = PictureInfo; //export for controller use
