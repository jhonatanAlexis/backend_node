const asyncHandler = require("express-async-handler")
const Review = require("../models/reviewsModel")

const getReview = asyncHandler(async(req, res) =>{
    const review = await Review.find()
    if(review.length === 0){
        res.status(404)
        throw new Error('No hay reviews')
    }
    res.status(200).json(review)
})

const crearReview = asyncHandler(async(req, res) =>{
    if(!req.body.nombre || !req.body.review || !req.body.stars){
        res.status(400)    
        throw new Error("Por favor, ingrese todos los campos")
    }
    const review = await Review.create({
        nombre: req.body.nombre,
        review: req.body.review,
        stars: req.body.stars
    })
    res.status(201).json(review)
})

const cambiarReview = asyncHandler(async(req, res) =>{
    const review = await Review.findById(req.params.id)
    if(!review){
        res.status(404)
        throw new Error('No hay ese review')
    }
    const reviewActualizado = await Review.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
    })

    res.status(200).json(reviewActualizado)
})

const eliminarReview = asyncHandler(async(req, res) =>{
    const review = await Review.findById(req.params.id)
    if(!review){
        res.status(404)
        throw new Error('El review no existe')
    }
    await Review.deleteOne(review)
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getReview,
    crearReview,
    cambiarReview,
    eliminarReview
}