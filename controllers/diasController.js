const asyncHandler = require("express-async-handler")
const Dia = require("../models/diasModel")

const getDia = asyncHandler(async(req, res) =>{
    const dia = await Dia.find()
    if(dia.length === 0){
        res.status(404)
        throw new Error('No hay dias')
    }
    res.status(200).json(dia)
})

const crearDia = asyncHandler(async(req, res) =>{
    let dia
    if(!req.body.dia){
        res.status(400)    
        throw new Error("Por favor, ingrese un dia")
    }
    if(req.body.dia == "3-4" || req.body.dia == "5-6"){
        dia = await Dia.create({
            dia: req.body.dia
        })
    }else{
        res.status(400)    
        throw new Error("Por favor, ingrese un dia valido")
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
    if(req.body.dia == "3-4" || req.body.dia == "5-6"){
        diaActualizado = await Dia.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
        })
    }else{
        res.status(400)    
        throw new Error("Por favor, ingrese un dia valido")
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