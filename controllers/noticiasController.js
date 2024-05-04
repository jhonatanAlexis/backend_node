const asyncHandler = require("express-async-handler")
const Noticia = require("../models/noticiasModel")

const getNoticia = asyncHandler(async(req, res) =>{
    const noticia = await Noticia.find()
    if(noticia.length === 0){
        res.status(404)
        throw new Error('No hay noticias')
    }
    res.status(200).json(noticia)
})

const crearNoticia = asyncHandler(async(req, res) =>{
    if(!req.body.img || !req.body.titulo || !req.body.descripcion){
        res.status(400)    
        throw new Error("Por favor, ingrese los datos")
    }
    const noticia = await Noticia.create({
        img: req.body.img,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    })
    res.status(201).json(noticia)
})

const cambiarNoticia = asyncHandler(async(req, res) =>{
    const noticia = await Noticia.findById(req.params.id)
    if(!noticia){
        res.status(404)
        throw new Error('Esa noticia no existe')
    }
    const noticiaActualizada = await Noticia.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
    })

    res.status(200).json(noticiaActualizada)
})

const eliminarNoticia = asyncHandler(async(req, res) =>{
    const noticia = await Noticia.findById(req.params.id)
    if(!noticia){
        res.status(404)
        throw new Error('La noticia no existe')
    }
    await Noticia.deleteOne(noticia)
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getNoticia,
    crearNoticia,
    cambiarNoticia,
    eliminarNoticia
}