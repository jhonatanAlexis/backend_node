const asyncHandler = require("express-async-handler")
const Tipo = require("../models/tiposModel")

const getTipo = asyncHandler(async(req, res) =>{
    const tipo = await Tipo.findOne({
        user: req.user._id
    })
    res.status(200).json(tipo)
})

const crearTipo = asyncHandler(async(req, res) =>{
    let tipo
    if(!req.body.tipo){
        res.status(400)    
        throw new Error("Por favor, ingrese un tipo")
    }
    else{
        tipo = await Tipo.create({
            tipo: req.body.tipo,
            user: req.user._id,
        })
    }
    res.status(201).json(tipo)
})

const cambiarTipo = asyncHandler(async(req, res) =>{
    let tipoActualizado
    const tipo = await Tipo.findById(req.params.id)
    if(!tipo){
        res.status(404)
        throw new Error('El tipo no existe')
    }
    else{
        tipoActualizado = await Tipo.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
        })
    }
    res.status(200).json(tipoActualizado)
})

const eliminarTipo = asyncHandler(async(req, res) =>{
    const tipo = await Tipo.findById(req.params.id)
    if(!tipo){
        res.status(404)
        throw new Error('El tipo no existe')
    }
    await Tipo.deleteOne(tipo)
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getTipo,
    crearTipo,
    cambiarTipo,
    eliminarTipo
}