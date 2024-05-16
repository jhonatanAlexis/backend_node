const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/authMIddleware")
const {getEdad, crearEdad, cambiarEdad, eliminarEdad} = require("../controllers/edadesController")

router.route("/").get(protect, getEdad).post(protect, crearEdad)
router.route("/:id").put(protect, cambiarEdad).delete(protect, eliminarEdad)

module.exports = router