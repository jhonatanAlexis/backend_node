const mongoose = require("mongoose")

const membershipModel = mongoose.Schema({
    precio: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Membership", membershipModel)