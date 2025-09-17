const mongoose = require("mongoose");

const offersSchema = new mongoose.Schema({
    name: String,
    discount: String,
    expiry: String,
    terms: String,
    description: String,
    background_img: String
});

module.exports = mongoose.model("Offer", offersSchema);