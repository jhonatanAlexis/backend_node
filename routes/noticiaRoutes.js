const express = require("express")
const router = express.Router()
const {getNoticia, crearNoticia, cambiarNoticia, eliminarNoticia} = require("../controllers/noticiasController")

router.route("/").get(getNoticia).post(crearNoticia)
router.route("/:id").put(cambiarNoticia).delete(eliminarNoticia)

module.exports = router