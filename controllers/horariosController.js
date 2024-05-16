const asyncHandler = require("express-async-handler")
const Horario = require("../models/horariosModel")

const getHorario = asyncHandler(async(req, res) =>{
    const horario = await Horario.findOne({
        user: req.user._id
    })
    res.status(200).json(horario)
})

const crearHorario = asyncHandler(async(req, res) =>{
    let horario
    if(!req.body.horario){
        res.status(400)    
        throw new Error("Por favor, ingrese un horario")
    }
    else{
        horario = await Horario.create({
            user: req.user._id,
            horario: req.body.horario
        })
    }
    res.status(201).json(horario)
})

const cambiarHorario = asyncHandler(async(req, res) =>{
    let horarioActualizado
    const horario = await Horario.findById(req.params.id)
    if(!horario){
        res.status(404)
        throw new Error('El horario no existe')
    }
    else{
        horarioActualizado = await Horario.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
        })
    }
    res.status(200).json(horarioActualizado)
})

const eliminarHorario = asyncHandler(async(req, res) =>{
    const horario = await Horario.findById(req.params.id)
    if(!horario){
        res.status(404)
        throw new Error('El horario no existe')
    }
    await Horario.deleteOne(horario)
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getHorario,
    crearHorario,
    cambiarHorario,
    eliminarHorario
}