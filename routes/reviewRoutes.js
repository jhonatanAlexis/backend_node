const express = require("express")
const router = express.Router()
const {getReview, crearReview, cambiarReview, eliminarReview} = require("../controllers/reviewsController")

router.route("/").get(getReview).post(crearReview)
router.route("/:id").put(cambiarReview).delete(eliminarReview)

module.exports = router