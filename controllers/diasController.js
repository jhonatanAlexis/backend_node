const asyncHandler = require("express-async-handler")
const Dia = require("../models/diasModel")

const getDia = asyncHandler(async(req, res) =>{
    const dia = await Dia.findOne({
        user: req.user._id
    })
    res.status(200).json(dia)
})

const crearDia = asyncHandler(async(req, res) =>{
    let dia
    if(!req.body.dia){
        res.status(400)    
        throw new Error("Por favor, ingrese un dia")
    }
    else{
        dia = await Dia.create({
            user: req.user._id,
            dia: req.body.dia
        })
    }
    res.status(201).json(dia)
})

const cambiarDia = asyncHandler(async(req, res) =>{
    let diaActualizado
    const dia = await Dia.findById(req.params.id)
    if(!dia){
        res.status(404)
        throw new Error('El dia no existe')
    }
    else{
        diaActualizado = await Dia.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
        })
    }
    res.status(200).json(diaActualizado)
})

const eliminarDia = asyncHandler(async(req, res) =>{
    const dia = await Dia.findById(req.params.id)
    if(!dia){
        res.status(404)
        throw new Error('El dia no existe')
    }
    await Dia.deleteOne(dia)
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getDia,
    crearDia,
    cambiarDia,
    eliminarDia
}