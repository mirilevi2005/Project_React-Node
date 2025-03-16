const mongoose = require('mongoose')

const LearningMaterialsSchema=new mongoose.Schema({
    LearningMaterialId:Number,
    nameMaterial:String,
    nameOfLectuers:String,
    date:Date,
})

module.exports=mongoose.model('LearningMaterials',LearningMaterialsSchema)