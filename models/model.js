const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")

const userModel = new mongoose.Schema({
    username: "String",
    email: "String",
    password: "String",
    phone: "Number",
    role: {
        type: String,
        enum: ["superAdmin","admin","user"],
    }
})

userModel.plugin(plm);

module.exports = mongoose.model("user", userModel)