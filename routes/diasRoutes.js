const express = require("express")
const router = express.Router()
const {getDia, crearDia, cambiarDia, eliminarDia} = require("../controllers/diasController")

router.route("/").get(getDia).post(crearDia)
router.route("/:id").put(cambiarDia).delete(eliminarDia)

module.exports = router