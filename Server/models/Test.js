const mongoose = require('mongoose');

const TestSchema  = new mongoose.Schema({
    title: { type: String, required: true }, 
    questions: [{
        questionText: { type: String, required: true }, 
        options: [{ type: String, required: true }], 
        correctAnswer: { type: String, required: true }, 
        timeLimit: { type: Number, default: 0 }
    }],
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   
    lastDate: { type: Date, required: true },
    courseName:{type:String,required: true}
});

module.exports = mongoose.model('Test', TestSchema );
