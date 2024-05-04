const asyncHandler = require("express-async-handler")
const Registro = require("../models/registroModel")

const getRegistro = asyncHandler(async(req, res) =>{
    const registro = await Registro.find()
    if(registro.length === 0){
        res.status(404)
        throw new Error('No hay registros')
    }
    res.status(200).json(registro)
})

const crearRegistro = asyncHandler(async(req, res) =>{
    if(!req.body.email){
        res.status(400)    
        throw new Error("Por favor, ingrese un email")
    }
    const registro = await Registro.create({
        email: req.body.email
    })
    res.status(201).json(registro)
})

const cambiarRegistro = asyncHandler(async(req, res) =>{
    const registro = await Registro.findById(req.params.id)
    if(!registro){
        res.status(404)
        throw new Error('El registro no existe')
    }
    const registroActualizado = await Registro.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
    })

    res.status(200).json(registroActualizado)
})

const eliminarRegistro = asyncHandler(async(req, res) =>{
    const registro = await Registro.findById(req.params.id)
    if(!registro){
        res.status(404)
        throw new Error('El registro no existe')
    }
    await Registro.deleteOne(registro)
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getRegistro,
    crearRegistro,
    cambiarRegistro,
    eliminarRegistro
}