const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/authMIddleware")
const {login, register, me, modificarUser, borrarUser} = require('../controllers/userController')

router.get("/me", protect, me)
router.post('/login', login)
router.post('/register', register)
router.put("/update", protect, modificarUser);
router.delete("/delete", protect, borrarUser);

module.exports = router