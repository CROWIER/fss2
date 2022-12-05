const mongoose = require("mongoose")

const employeeSchema =new mongoose.Schema({
    first_name: {
    type: String,
    require: true,
    lowercase: true
    },
    last_name: {
        type: String,
        require: true,
        lowercase: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    gender: {
        type: String,
    },
    salary: {
        type: Number,
        require: true}
})

module.exports = mongoose.model("employee", employeeSchema)