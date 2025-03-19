const express = require("express")
const router = express.Router()
///why we need it?
const LearningMaterials = require("../models/LearningMaterials");
const {addMaterial,getAllMaterials,deleteMaterial} = require("../controllers/users");
router.post('/', addMaterial);
router.delete('/:MaterialId', deleteMaterial);
router.get('/', getAllMaterials);

module.exports = router