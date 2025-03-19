
const mongoose = require('mongoose');

const LearningMaterialsSchema = new mongoose.Schema({
    nameCours: {
        type: String,
    },
    nameOfLectuers: {
        type: String,
        lowercase: true,
        index: true,
        unique: true
    },
    uploadDate:{
        type:Date,
    },
    finishDate:{
        type:Date,
    }
});


module.exports=mongoose.model('LearningMaterials',LearningMaterialsSchema)

