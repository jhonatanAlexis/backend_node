const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/usuarioModel")

const register = asyncHandler ( async (req, res) =>{
    if(!req.body.username || !req.body.email || !req.body.password){
        res.status(400)
        throw new Error("Por favor, rellena todos los datos")
    }

    const e = req.body.email 
    const userExiste = await User.findOne({email:e})
    if(userExiste){
        res.status(400).json({
            message: "El usuario ya existe", //va a mandar este mensaje
            error: true //error va a ser true porque ya existe un usuario con ese email
        })
    }

    const salt = await bcrypt.genSalt(10) 
    const hashPassword = await bcrypt.hash(req.body.password, salt) 

    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })

    res.status(201).json({
        message: "Usuario registrado exitosamente",
        error: false,
        user: user
    })
})

const login = asyncHandler (async (req, res) =>{
    const {username, email, password} = req.body
    const user = await User.findOne({email})
    const person = await User.findOne({username})
    if(user && person && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id, 
            username: user.username,
            email: user.email,
            token: generarToken(user.id),
        })

    }else{
        res.status(400).json({
            message: "Datos incorrectos o no existe ese usuario",
            error: true
        })
    }
})

const generarToken = (idusuario) =>{
    return jwt.sign({idusuario}, process.env.JWT_SECRET, { 
        expiresIn: "30d" 
    })
}

const me = asyncHandler ( async(req, res) =>{
    const usuario = await User.findOne(req.user)
    res.status(200).json(usuario)
})

const modificarUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(404);
        throw new Error('No se encontró el usuario');
    }
    const email = req.body.email
    const userExist = await User.findOne({email});

    if(userExist && !user.equals(userExist)){
        res.status(400);
        throw new Error("Ya existe un usuario con ese email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const userActualizado = await User.findByIdAndUpdate(req.user.id, {username: req.body.username, email: req.body.email, password:hashedPassword}, {new: true});
    res.status(200).json({datos: userActualizado, message: "Se actualizaron los datos"});
});
const borrarUser = asyncHandler( async (req, res) => {
    const userBorrado = await User.findById(req.user.id);
    if(!userBorrado){
        res.status(404);
        throw new Error('No se encontró el usuario');
    }
    if(await bcrypt.compare(req.body.password, userBorrado.password)){
        await User.deleteOne(userBorrado);
        res.status(200).json({message: `La cuenta se eliminó con éxito`, error: false});
    }
    res.status(400);
    throw new Error("Contraseña incorrecta");
});

module.exports={
    register,
    login,
    me,
    modificarUser,
    borrarUser
}