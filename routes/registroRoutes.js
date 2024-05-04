const express = require("express")
const router = express.Router()
const {getRegistro, crearRegistro, cambiarRegistro, eliminarRegistro} = require("../controllers/registrosController")

router.route("/").get(getRegistro).post(crearRegistro)
router.route("/:id").put(cambiarRegistro).delete(eliminarRegistro)

module.exports = router