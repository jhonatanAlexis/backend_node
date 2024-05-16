const asyncHandler = require("express-async-handler")
const Membership = require("../models/membershipsModel")

const getMembership = asyncHandler(async(req, res) =>{
    const membership = await Membership.findOne({
        user: req.user._id
    })
    res.status(200).json(membership)
})

const crearMembership = asyncHandler(async(req, res) =>{
    if(!req.body.precio || !req.body.tipo || !req.body.descripcion){
        res.status(400)    
        throw new Error("Por favor, ingrese todos los campos")
    }

    // Verificar si el usuario ya tiene una membresía
    const existingMembership = await Membership.findOne({ user: req.user._id });
    if(existingMembership) {
        res.status(400);
        throw new Error("Ya tienes una membresía activa");
    }

    // Si el usuario no tiene una membresía existente, crear una nueva
    const membership = await Membership.create({
        precio: req.body.precio,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        user: req.user._id,
    })

    res.status(201).json({
        membership,
        message: "Membresía creada con éxito", //mensaje 
        success: true //si es creada success sera verdadero
    })
})

const cambiarMembership = asyncHandler(async(req, res) =>{
    const membership = await Membership.findById(req.params.id)
    if(!membership){
        res.status(404)
        throw new Error('La membership no existe')
    }
    const membershipActualizado = await Membership.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
    })

    res.status(200).json(membershipActualizado)
})

const eliminarMembership = asyncHandler(async(req, res) =>{
    const membership = await Membership.findById(req.params.id)
    if(!membership){
        res.status(404)
        throw new Error('La membership no existe')
    }
    await Membership.deleteOne(membership)
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getMembership,
    crearMembership,
    cambiarMembership,
    eliminarMembership
}