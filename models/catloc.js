const mongoose = require("mongoose"); //import mongoose
const Cat = require("./cat");

// Catloc schema
const CatlocSchema = new mongoose.Schema({
    created_at: { type:String, default: new Date() },
    seen_time: { type: Number },
    cat: { type: mongoose.Schema.Types.ObjectId, ref: "Cat" },
    coordinates: [{ type: String }],
    country: { type: String }
});

const Catloc = mongoose.model('Catloc', CatlocSchema); //convert to model named Catloc
module.exports = Catloc; //export for controller use
