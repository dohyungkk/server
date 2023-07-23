const express = require('express')
const { getVehicles, postVehicles } = require('../controller/controller')

const router = express.Router();

router.get("/vehicles", getVehicles)

module.exports = router