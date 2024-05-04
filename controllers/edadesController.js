const asyncHandler = require("express-async-handler")
const Edad = require("../models/edadesModel")

const getEdad = asyncHandler(async(req, res) =>{
    const edad = await Edad.find()
    if(edad.length === 0){
        res.status(404)
        throw new Error('No hay edades')
    }
    res.status(200).json(edad)
})

const crearEdad = asyncHandler(async(req, res) =>{
    let edad
    if(!req.body.edad){
        res.status(400)    
        throw new Error("Por favor, ingrese una edad")
    }
    if(req.body.edad == "30-" || req.body.edad == "31+"){
        edad = await Edad.create({
            edad: req.body.edad
        })
    }else{
        res.status(400)    
        throw new Error("Rango de edad no valido")
    }
    res.status(201).json(edad)
})

const cambiarEdad = asyncHandler(async(req, res) =>{
    let edadActualizada
    const edad = await Edad.findById(req.params.id)
    if(!edad){
        res.status(404)
        throw new Error('La edad no existe')
    }
    if(req.body.edad == "30-" || req.body.edad == "31+"){
        edadActualizada = await Edad.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
        })
    }else{
        res.status(400)    
        throw new Error("Rango de edad no valido")
    }
    res.status(200).json(edadActualizada)
})

const eliminarEdad = asyncHandler(async(req, res) =>{
    const edad = await Edad.findById(req.params.id)
    if(!edad){
        res.status(404)
        throw new Error('La edad no existe')
    }
    await Edad.deleteOne(edad)
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getEdad,
    crearEdad,
    cambiarEdad,
    eliminarEdad
}