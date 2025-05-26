const express = require("express")
const router = express.Router()
///why we need it?
const student = require("../models/student");
const studentController = require("../controllers/studentController");
router.post('/:nameCours', studentController.addMaterial);
router.get('/:nameCours', studentController.getAllMaterials);

module.exports = router