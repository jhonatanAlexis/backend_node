const asyncHandler = require("express-async-handler")
const Horario = require("../models/horariosModel")

const getHorario = asyncHandler(async(req, res) =>{
    const horario = await Horario.find()
    if(horario.length === 0){
        res.status(404)
        throw new Error('No hay horario')
    }
    res.status(200).json(horario)
})

const crearHorario = asyncHandler(async(req, res) =>{
    let horario
    if(!req.body.horario){
        res.status(400)    
        throw new Error("Por favor, ingrese un horario")
    }
    if(req.body.horario == "Manaña" || req.body.horario == "Noche"){
        horario = await Horario.create({
            horario: req.body.horario
        })
    }else{
        res.status(400)    
        throw new Error("Por favor, ingrese un horario valido")
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
    if(req.body.horario == "Manaña" || req.body.horario == "Noche"){
        horarioActualizado = await Horario.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
        })
    }else{
        res.status(400)    
        throw new Error("Por favor, ingrese un horario valido")
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