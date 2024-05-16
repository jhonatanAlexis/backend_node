const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/authMIddleware")
const {getDia, crearDia, cambiarDia, eliminarDia} = require("../controllers/diasController")

router.route("/").get(protect, getDia).post(protect, crearDia)
router.route("/:id").put(protect, cambiarDia).delete(protect, eliminarDia)

module.exports = router