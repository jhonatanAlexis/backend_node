const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Escriba un username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Escriba un email"]
    },
    password: {
        type: String,
        required: [true, "Escriba una contraseña"]
    }
})

module.exports = mongoose.model('User', userSchema)