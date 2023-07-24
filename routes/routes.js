const express = require('express')
const { getVehicles, postVehicles } = require('../controller/vehiclesController')
const { login } = require('../controller/loginController')

const router = express.Router();

router.get("/vehicles", getVehicles)
router.post("/login", login)

module.exports = router
