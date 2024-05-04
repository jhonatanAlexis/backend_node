const mongoose = require("mongoose")

const reviewModel = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Review", reviewModel)