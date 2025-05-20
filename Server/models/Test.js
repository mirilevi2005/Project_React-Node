
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: String,
  questions: Array,
  teacherId: mongoose.Schema.Types.ObjectId,
  lastDate: Date,
  courseName: String,
  studentsStarted: [
    {
      studentId: mongoose.Schema.Types.ObjectId,
      startedAt: { type: Date, default: Date.now }
    }
  ],

  studentsScores: [
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // או 'Student' לפי איך שהמודל שלך נקרא
    score: Number,
    finishedAt: { type: Date, default: Date.now }
  }
]

});

module.exports = mongoose.model('Test', testSchema);
