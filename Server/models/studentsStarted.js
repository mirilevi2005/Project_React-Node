const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
  timeLimit: Number,
});

const studentStartedSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
});

const testSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  lastDate: Date,
  courseName: String,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  studentsStarted: [studentStartedSchema],
});

module.exports = mongoose.model('Test', testSchema);