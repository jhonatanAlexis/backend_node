const mongoose = require("mongoose")

const horarioModel = mongoose.Schema({
    horario: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Horario", horarioModel)