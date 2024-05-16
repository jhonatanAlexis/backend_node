const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/authMIddleware")
const {getTipo, crearTipo, cambiarTipo, eliminarTipo} = require("../controllers/tiposController")

router.route("/").get(protect, getTipo).post(protect, crearTipo)
router.route("/:id").put(protect, cambiarTipo).delete(protect, eliminarTipo)

module.exports = router