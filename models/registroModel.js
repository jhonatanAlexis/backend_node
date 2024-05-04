const mongoose = require("mongoose")

const registroModel = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Registro", registroModel)