const mongoose = require("mongoose")

const edadModel = mongoose.Schema({
    edad: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Edad", edadModel)