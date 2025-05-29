


// const mongoose = require('mongoose');
// const Test = require('../models/Test');

// // 1. יצירת מבחן חדש
// exports.createTest = async (req, res) => {
//   try {
//     const { title, questions, teacherId, lastDate, courseName } = req.body;

//     const newTest = new Test({
//       title,
//       questions,
//       teacherId,
//       lastDate,
//       courseName,
//       studentsStarted: [],
//       studentsScores: []
//     });

//     await newTest.save();
//     res.status(201).json({ message: 'Test created successfully', test: newTest });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create test', error });
//   }
// };

// // 2. קבלת כל המבחנים
// exports.getTests = async (req, res) => {
//   try {
//     const tests = await Test.find();
//     res.status(200).json({ tests });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to retrieve tests', error });
//   }
// };

// // 3. קבלת מבחן לפי ID
// exports.getTestById = async (req, res) => {
//   try {
//     const testId = req.params.id;
//     const test = await Test.findById(testId);

//     if (!test) {
//       return res.status(404).json({ message: 'Test not found' });
//     }

//     res.status(200).json({ test });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to retrieve test', error });
//   }
// };

// // 4. מבחנים לפי קורס + האם התלמיד התחיל כבר
// exports.getTestByCourse = async (req, res) => {
//   const { courseName } = req.params;
//   const { studentId } = req.query;

//   try {
//     const tests = await Test.find({ courseName })
//       .populate('studentsScores.studentId', 'userName email');

//     const updatedTests = tests.map(test => {
//       const alreadyStarted = Array.isArray(test.studentsStarted) && studentId
//         ? test.studentsStarted.some(s => s.studentId?.toString() === studentId)
//         : false;

//       return {
//         ...test.toObject(),
//         alreadyStarted,
//       };
//     });

//     res.json({ tests: updatedTests });
//   } catch (error) {
//     console.error("Error fetching tests by course:", error);
//     res.status(500).json({ message: 'Error fetching tests' });
//   }
// };

// // 5. עדכון מבחן
// exports.updateTest = async (req, res) => {
//   try {
//     const testId = req.params.id;
//     const { title, questions, teacherId, lastDate } = req.body;

//     const updatedTest = await Test.findByIdAndUpdate(
//       testId,
//       { title, questions, teacherId, lastDate },
//       { new: true }
//     );

//     if (!updatedTest) {
//       return res.status(404).json({ message: 'Test not found' });
//     }

//     res.status(200).json({ message: 'Test updated successfully', test: updatedTest });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update test', error });
//   }
// };

// // 6. מחיקת מבחן
// exports.deleteTest = async (req, res) => {
//   try {
//     const testId = req.params.id;
//     const deletedTest = await Test.findByIdAndDelete(testId);

//     if (!deletedTest) {
//       return res.status(404).json({ message: 'Test not found' });
//     }

//     res.status(200).json({ message: 'Test deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete test', error });
//   }
// };

// // 7. התחלת מבחן - רישום שהתלמיד התחיל אותו
// exports.startTest = async (req, res) => {
//   try {
//     const { testId } = req.params;
//     const { studentId } = req.body;

//     const test = await Test.findById(testId);
//     if (!test) return res.status(404).json({ message: 'Test not found' });

//     const alreadyStarted = test.studentsStarted.some(
//       entry => entry.studentId?.toString() === studentId
//     );

//     if (alreadyStarted) {
//       return res.status(403).json({ message: 'Test already started by this student' });
//     }

//     test.studentsStarted.push({ studentId });
//     await test.save();

//     res.status(200).json({ message: 'Test started successfully' });
//   } catch (error) {
//     console.error('Error starting test:', error);
//     res.status(500).json({ message: 'Failed to start test', error: error.message });
//   }
// };

// // 8. קבלת ציוני מבחן כולל פרטי תלמידים
// exports.getTestScores = async (req, res) => {
//   try {
//     const { testId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(testId)) {
//       return res.status(400).json({ message: 'Invalid test ID' });
//     }

//     const test = await Test.findById(testId).populate('studentsScores.studentId', 'userName email');
// console.log(test);

//     if (!test) {
//       return res.status(404).json({ message: 'Test not found' });
//     }

//     const scores = test.studentsScores.map(entry => ({
//       studentId: entry.studentId._id.toString(),
//       userName: entry.studentId.userName,
//       email: entry.studentId.email,
//       score: entry.score,
//       finishedAt: entry.finishedAt
//     }));

//     res.status(200).json({ scores });
//   } catch (error) {
//     console.error('Error fetching test scores:', error);
//     res.status(500).json({ message: 'Failed to retrieve scores' });
//   }
// };

// // 9. שליחת ציון מבחן (שמירת ציון לתלמיד)
// exports.submitScore = async (req, res) => {
//   const { testId } = req.params;
//   const { studentId, score } = req.body;

//   try {
//     const test = await Test.findById(testId);
//     if (!test) return res.status(404).json({ message: 'Test not found' });

//     const existingScoreIndex = test.studentsScores.findIndex(
//       s => s.studentId.toString() === studentId
//     );

//     if (existingScoreIndex !== -1) {
//       test.studentsScores[existingScoreIndex].score = score;
//       test.studentsScores[existingScoreIndex].finishedAt = new Date();
//     } else {
//       test.studentsScores.push({ studentId, score, finishedAt: new Date() });
//     }

//     await test.save();
//     res.status(200).json({ message: 'Score saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to save score', error });
//   }
// };

// // 10. קבלת מבחנים חדשים מאז ההתחברות האחרונה
// exports.getNewTests = async (req, res) => {
//   const { lastLogin } = req.params;

//   if (!lastLogin || isNaN(Date.parse(lastLogin))) {
//     return res.status(400).json({ message: 'Invalid last login date' });
//   }

//   try {
//     const newTests = await Test.find({ createdAt: { $gt: new Date(lastLogin) } });
//     res.json(newTests);
//   } catch (error) {
//     console.error('Error fetching new tests:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 5. מבחנים לפי קורס - למורה
// exports.getTestsByCourseForTeacher = async (req, res) => {
//     const { courseName } = req.params;

//     try {
//         const tests = await Test.find({ courseName });
//         res.json({ tests });
//     } catch (error) {
//         console.error("שגיאה בשליפת מבחנים לפי קורס:", error);
//         res.status(500).json({ message: 'שגיאה בשליפת מבחנים' });
//     }
// };const mongoose = require('mongoose');
const Test = require('../models/Test');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendScoreEmail = async (toEmail, fullName, score, testTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `תוצאה במבחן: ${testTitle}`,
    text: `\n${fullName} היקרה,\n\nסיימת את המבחן "${testTitle}".\nהציון שלך הוא: ${score} מתוך 100.\n\nבהצלחה בהמשך הלמידה!\n\nצוות EduThec\n    `
  };
  await transporter.sendMail(mailOptions);
};

// 1. יצירת מבחן חדש
exports.createTest = async (req, res) => {
  try {
    const { title, questions, teacherId, lastDate, courseName } = req.body;

    const newTest = new Test({
      title,
      questions,
      teacherId,
      lastDate,
      courseName,
      studentsStarted: [],
      studentsScores: []
    });

    await newTest.save();
    res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create test', error });
  }
};

// 2. קבלת כל המבחנים
exports.getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json({ tests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve tests', error });
  }
};

// 3. קבלת מבחן לפי ID
exports.getTestById = async (req, res) => {
  try {
    const testId = req.params.id;
    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve test', error });
  }
};

// 4. מבחנים לפי קורס + האם התלמיד התחיל כבר
exports.getTestByCourse = async (req, res) => {
  const { courseName } = req.params;
  const { studentId } = req.query;

  try {
    const tests = await Test.find({ courseName })
      .populate('studentsScores.studentId', 'userName email');

    const updatedTests = tests.map(test => {
      const alreadyStarted = Array.isArray(test.studentsStarted) && studentId
        ? test.studentsStarted.some(s => s.studentId?.toString() === studentId)
        : false;

      return {
        ...test.toObject(),
        alreadyStarted,
      };
    });

    res.json({ tests: updatedTests });
  } catch (error) {
    console.error("Error fetching tests by course:", error);
    res.status(500).json({ message: 'Error fetching tests' });
  }
};

// 5. עדכון מבחן
exports.updateTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const { title, questions, teacherId, lastDate } = req.body;

    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { title, questions, teacherId, lastDate },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ message: 'Test updated successfully', test: updatedTest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update test', error });
  }
};

// 6. מחיקת מבחן
exports.deleteTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const deletedTest = await Test.findByIdAndDelete(testId);

    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete test', error });
  }
};

// 7. התחלת מבחן - רישום שהתלמיד התחיל אותו
exports.startTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const { studentId } = req.body;

    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    const alreadyStarted = test.studentsStarted.some(
      entry => entry.studentId?.toString() === studentId
    );

    if (alreadyStarted) {
      return res.status(403).json({ message: 'Test already started by this student' });
    }

    test.studentsStarted.push({ studentId });
    await test.save();

    res.status(200).json({ message: 'Test started successfully' });
  } catch (error) {
    console.error('Error starting test:', error);
    res.status(500).json({ message: 'Failed to start test', error: error.message });
  }
};

// 8. קבלת ציוני מבחן כולל פרטי תלמידים
exports.getTestScores = async (req, res) => {
  try {
    const { testId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({ message: 'Invalid test ID' });
    }

    const test = await Test.findById(testId).populate('studentsScores.studentId', 'userName email');
    console.log(test);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const scores = test.studentsScores.map(entry => ({
      studentId: entry.studentId._id.toString(),
      userName: entry.studentId.userName,
      email: entry.studentId.email,
      score: entry.score,
      finishedAt: entry.finishedAt
    }));

    res.status(200).json({ scores });
  } catch (error) {
    console.error('Error fetching test scores:', error);
    res.status(500).json({ message: 'Failed to retrieve scores' });
  }
};

// 9. שליחת ציון מבחן (שמירת ציון לתלמיד)
exports.submitScore = async (req, res) => {
  const { testId } = req.params;
  const { studentId, score } = req.body;

  try {
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    const existingScoreIndex = test.studentsScores.findIndex(
      s => s.studentId.toString() === studentId
    );

    let student;
    if (existingScoreIndex !== -1) {
      test.studentsScores[existingScoreIndex].score = score;
      test.studentsScores[existingScoreIndex].finishedAt = new Date();
      student = await User.findById(studentId);
    } else {
      test.studentsScores.push({ studentId, score, finishedAt: new Date() });
      student = await User.findById(studentId);
    }

    await test.save();

    // שליחת מייל לאחר שמירת הציון
    if (student && student.email) {
      await sendScoreEmail(student.email, student.userName, score, test.title);
    }

    res.status(200).json({ message: 'Score saved successfully and email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save score', error });
  }
};

// 10. קבלת מבחנים חדשים מאז ההתחברות האחרונה
exports.getNewTests = async (req, res) => {
  const { lastLogin } = req.params;

  if (!lastLogin || isNaN(Date.parse(lastLogin))) {
    return res.status(400).json({ message: 'Invalid last login date' });
  }

  try {
    const newTests = await Test.find({ createdAt: { $gt: new Date(lastLogin) } });
    res.json(newTests);
  } catch (error) {
    console.error('Error fetching new tests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 11. מבחנים לפי קורס - למורה
exports.getTestsByCourseForTeacher = async (req, res) => {
  const { courseName } = req.params;

  try {
    const tests = await Test.find({ courseName });
    res.json({ tests });
  } catch (error) {
    console.error("שגיאה בשליפת מבחנים לפי קורס:", error);
    res.status(500).json({ message: 'שגיאה בשליפת מבחנים' });
  }
};
