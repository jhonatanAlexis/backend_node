const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/authMIddleware")
const {getHorario, crearHorario, cambiarHorario, eliminarHorario} = require("../controllers/horariosController")

router.route("/").get(protect, getHorario).post(protect, crearHorario)
router.route("/:id").put(protect, cambiarHorario).delete(protect, eliminarHorario)

module.exports = router