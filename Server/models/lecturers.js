const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
    _id:{
            type:mongoose.Schema.Types.ObjectId
        },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    roles: {
        type: String, 
        enum: ['lacturer', 'student'],
        default: 'lacturer'
    },
    nameCours: {
        type: String, 
        required: true
    },
    marksOfStudent: [
        [
            {
                "_id": mongoose.Schema.Types.ObjectId, // מזהה ייחודי לכל ציון
                "mark": Number // הציון במבחן מסוים
            }
        ]
    ]
});

module.exports = mongoose.model('leactures', LectureSchema);
