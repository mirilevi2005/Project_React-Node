
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: String,
  questions: Array,
  teacherId: mongoose.Schema.Types.ObjectId,
  lastDate: Date,
  courseName: String,
  studentsStarted: [{ studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  studentsScores: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: Number,
    finishedAt: Date
  }]
}, { timestamps: true }); 

module.exports = mongoose.model('Test', testSchema);
