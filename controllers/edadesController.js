const asyncHandler = require("express-async-handler")
const Edad = require("../models/edadesModel")

const getEdad = asyncHandler(async(req, res) =>{
    const edad = await Edad.findOne({ //la diferencia entre find y findOne es que fin encuentra todos (array) y findOne encuentra solo uno (object)
        user: req.user._id
    })
    res.status(200).json(edad)
})

const crearEdad = asyncHandler(async(req, res) =>{
    let edad
    if(!req.body.edad){
        res.status(400)    
        throw new Error("Por favor, ingrese una edad")
    }
    else{
        edad = await Edad.create({
            user: req.user._id,
            edad: req.body.edad,
        })
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
    else{
        edadActualizada = await Edad.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
        })
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
    eliminarEdad,
}