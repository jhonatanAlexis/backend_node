const express = require("express")
const router = express.Router()
const {getEdad, crearEdad, cambiarEdad, eliminarEdad} = require("../controllers/edadesController")

router.route("/").get(getEdad).post(crearEdad)
router.route("/:id").put(cambiarEdad).delete(eliminarEdad)

module.exports = router