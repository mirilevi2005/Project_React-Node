const express = require("express")
const router = express.Router()
// const student = require("../models/student");
const studentController = require("../controllers/studentController");
router.post('/:nameCours', studentController.addMaterial);
router.get('/:nameCours', studentController.getAllMaterials);

module.exports = router