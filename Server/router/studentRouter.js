const express = require("express")
const router = express.Router()
///why we need it?
const student = require("../models/student");
const {addMaterial,getAllMaterials} = require("../controllers/studentController");
router.post('/:nameCours', addMaterial);
router.get('/:nameCours', getAllMaterials);

module.exports = router