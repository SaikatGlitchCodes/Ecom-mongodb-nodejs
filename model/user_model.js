const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    address: String,
    password: String

   });

module.exports = mongoose.model("User", userSchema);