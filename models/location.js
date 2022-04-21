const mongoose = require("mongoose"); //import mongoose
const Review = require("./review");

// Location schema
const LocationSchema = new mongoose.Schema({
    created_at: { type:String, default: new Date() },
    review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    coordinates: [{ type: String }]
});

const Location = mongoose.model('Location', LocationSchema); //convert to model named Location
module.exports = Location; //export for controller use
