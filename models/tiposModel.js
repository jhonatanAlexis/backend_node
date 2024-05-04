const mongoose = require("mongoose")

const tipoModel = mongoose.Schema({
    tipo: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Tipo", tipoModel)