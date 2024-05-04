const asyncHandler = require("express-async-handler")
const Tipo = require("../models/tiposModel")

const getTipo = asyncHandler(async(req, res) =>{
    const tipo = await Tipo.find()
    if(tipo.length === 0){
        res.status(404)
        throw new Error('No hay tipos')
    }
    res.status(200).json(tipo)
})

const crearTipo = asyncHandler(async(req, res) =>{
    let tipo
    if(!req.body.tipo){
        res.status(400)    
        throw new Error("Por favor, ingrese un tipo")
    }
    if(req.body.tipo == "Cardio" || req.body.tipo == "Pesas"){
        tipo = await Tipo.create({
            tipo: req.body.tipo
        })
    }else{
        res.status(400)    
        throw new Error("Por favor, ingrese un tipo válido")
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
    if(req.body.tipo == "Cardio" || req.body.tipo == "Pesas"){
        tipoActualizado = await Tipo.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
        })
    }else{
        res.status(400)    
        throw new Error("Por favor, ingrese un tipo válido")
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