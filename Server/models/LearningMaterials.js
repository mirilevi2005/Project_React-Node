



const mongoose = require('mongoose');

const LearningMaterialsSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId
    },
    nameCours: {
        type: String,
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    finishDate: {
        type: Date,
    },
    videoPath: { 
        type: String,
        required: true
    },
    videoName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('LearningMaterials', LearningMaterialsSchema);
