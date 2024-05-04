const mongoose = require("mongoose")

const diaModel = mongoose.Schema({
    dia: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Dia", diaModel)