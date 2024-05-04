const asyncHandler = require("express-async-handler")
const Membership = require("../models/membershipsModel")

const getMembership = asyncHandler(async(req, res) =>{
    const membership = await Membership.find()
    if(membership.length === 0){
        res.status(404)
        throw new Error('No hay memberships')
    }
    res.status(200).json(membership)
})

const crearMembership = asyncHandler(async(req, res) =>{
    if(!req.body.precio ||!req.body.tipo || !req.body.descripcion){
        res.status(400)    
        throw new Error("Por favor, ingrese todos los campos")
    }
    const membership = await Membership.create({
        precio: req.body.precio,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion
    })
    res.status(201).json(membership)
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