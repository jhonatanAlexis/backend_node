const express = require("express")
const router = express.Router()
const {getHorario, crearHorario, cambiarHorario, eliminarHorario} = require("../controllers/horariosController")

router.route("/").get(getHorario).post(crearHorario)
router.route("/:id").put(cambiarHorario).delete(eliminarHorario)

module.exports = router