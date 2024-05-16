const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/authMIddleware")
const {getMembership, crearMembership, cambiarMembership, eliminarMembership} = require("../controllers/membershipsController")

router.route("/").get(protect, getMembership).post(protect, crearMembership)
router.route("/:id").put(protect, cambiarMembership).delete(protect, eliminarMembership)

module.exports = router