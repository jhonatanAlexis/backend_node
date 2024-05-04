const express = require("express")
const router = express.Router()
const {getMembership, crearMembership, cambiarMembership, eliminarMembership} = require("../controllers/membershipsController")

router.route("/").get(getMembership).post(crearMembership)
router.route("/:id").put(cambiarMembership).delete(eliminarMembership)

module.exports = router