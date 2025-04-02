

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
    videoPath: { // שדה חדש לשמירת הנתיב של הווידאו
        type: String,
        required: true
    },
    videoName: { // שדה חדש לשמירת הנתיב של הווידאו
        type: String,
        required: true
    }
});

module.exports = mongoose.model('LearningMaterials', LearningMaterialsSchema);
