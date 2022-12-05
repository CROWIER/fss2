const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    user_name: {
        type: String,
        require: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("user", userSchema)