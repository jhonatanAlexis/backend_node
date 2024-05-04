const express = require("express")
const router = express.Router()
const {getTipo, crearTipo, cambiarTipo, eliminarTipo} = require("../controllers/tiposController")

router.route("/").get(getTipo).post(crearTipo)
router.route("/:id").put(cambiarTipo).delete(eliminarTipo)

module.exports = router