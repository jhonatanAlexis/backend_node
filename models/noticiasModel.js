const mongoose = require("mongoose")

const noticiaModel = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Noticia", noticiaModel)