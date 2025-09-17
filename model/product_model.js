const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    category: {
        type : 'String',
        required : true
    },
    inStock: Boolean,
    description: String,
    product_img: String
});

module.exports = mongoose.model("Product", productSchema);


// singular -- pural

// import {useState, default : React} from 'react'