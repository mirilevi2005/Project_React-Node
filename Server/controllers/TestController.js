
// const Test = require('../models/Test'); // המודל של מבחנים

// // 1. יצירת מבחן חדש
// exports.createTest = async (req, res) => {
//     try {
//         const { title, questions, teacherId, lastDate, courseName } = req.body;

//         const newTest = new Test({
//             title,
//             questions,
//             teacherId,
//             lastDate,
//             courseName,
//             studentsStarted: [],
//             studentsScores: []
//         });

//         await newTest.save();
//         res.status(201).json({ message: 'Test created successfully', test: newTest });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to create test', error });
//     }
// };

// // 2. קבלת כל המבחנים
// exports.getTests = async (req, res) => {
//     try {
//         const tests = await Test.find();
//         res.status(200).json({ tests });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to retrieve tests', error });
//     }
// };

// // 3. קבלת מבחן לפי ID
// exports.getTestById = async (req, res) => {
//     try {
//         const testId = req.params.id;
//         const test = await Test.findById(testId);

//         if (!test) {
//             return res.status(404).json({ message: 'Test not found' });
//         }

//         res.status(200).json({ test });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to retrieve test', error });
//     }
// };

// exports.getTestByCourse = async (req, res) => {
//   const { courseName } = req.params;
//   const { studentId } = req.query;
//   console.log("קיבלתי קריאה לgetTestByCourse עם courseName:", courseName, "studentId:", studentId);

//   try {
//     // מצא את כל המבחנים של הקורס ו-populate את פרטי התלמידים בציונים
//     const tests = await Test.find({ courseName })
//       .populate('studentsScores.studentId', 'fullName email');

//     const updatedTests = tests.map(test => {
//       const alreadyStarted = Array.isArray(test.studentsStarted) && studentId
//           ? test.studentsStarted.some(s => s.studentId?.toString() === studentId)
//           : false;

//       return {
//         ...test.toObject(),
//         alreadyStarted,
//       };
//     });

//     res.json({ tests: updatedTests });
//   } catch (error) {
//     console.error("שגיאה בשליפת מבחנים לפי קורס:", error);
//     res.status(500).json({ message: 'שגיאה בשליפת מבחנים' });
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
// };

// // 6. עדכון מבחן
// exports.updateTest = async (req, res) => {
//     try {
//         const testId = req.params.id;
//         const { title, questions, teacherId, lastDate } = req.body;

//         const updatedTest = await Test.findByIdAndUpdate(
//             testId,
//             { title, questions, teacherId, lastDate },
//             { new: true }
//         );

//         if (!updatedTest) {
//             return res.status(404).json({ message: 'Test not found' });
//         }

//         res.status(200).json({ message: 'Test updated successfully', test: updatedTest });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to update test', error });
//     }
// };

// // 7. מחיקת מבחן
// exports.deleteTest = async (req, res) => {
//     try {
//         const testId = req.params.id;
//         const deletedTest = await Test.findByIdAndDelete(testId);

//         if (!deletedTest) {
//             return res.status(404).json({ message: 'Test not found' });
//         }

//         res.status(200).json({ message: 'Test deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to delete test', error });
//     }
// };

// // 8. התחלת מבחן - רישום שהתלמיד התחיל אותו
// exports.startTest = async (req, res) => {
//     try {
//         const { testId } = req.params;
//         const { studentId } = req.body;

//         const test = await Test.findById(testId);
//         if (!test) return res.status(404).json({ message: 'Test not found' });

//         // בדיקה אם התלמיד כבר התחיל את המבחן
//         const alreadyStarted = test.studentsStarted.some(
//             entry => entry.studentId?.toString() === studentId
//         );

//         if (alreadyStarted) {
//             return res.status(403).json({ message: 'Test already started by this student' });
//         }

//         // רישום התחלה
//         test.studentsStarted.push({ studentId });
//         await test.save();

//         res.status(200).json({ message: 'Test started successfully' });
//     } catch (error) {
//         console.error('Error starting test:', error);
//         res.status(500).json({ message: 'Failed to start test', error: error.message });
//     }
// };
// exports.getTestScores = async (req, res) => {
//   try {
//     const { testId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(testId)) {
//       return res.status(400).json({ message: 'Invalid test ID' });
//     }

//     const test = await Test.findById(testId).populate('studentsScores.studentId', 'fullName email');

//     if (!test) {
//       return res.status(404).json({ message: 'Test not found' });
//     }

//     const scores = test.studentsScores.map(entry => ({
//       studentId: entry.studentId._id,
//       fullName: entry.studentId.fullName,
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
// // 10. שליחת ציון מבחן (שמירת ציון לתלמיד)
// exports.submitScore = async (req, res) => {
//     const { testId } = req.params;
//     const { studentId, score } = req.body;

//     try {
//         const test = await Test.findById(testId);
//         if (!test) return res.status(404).json({ message: 'Test not found' });

//         // בדיקה אם כבר קיים ציון לתלמיד
//         const existingScoreIndex = test.studentsScores.findIndex(
//             s => s.studentId.toString() === studentId
//         );

//         if (existingScoreIndex !== -1) {
//             // עדכון ציון קיים
//             test.studentsScores[existingScoreIndex].score = score;
//             test.studentsScores[existingScoreIndex].finishedAt = new Date();
//         } else {
//             // הוספת ציון חדש
//             test.studentsScores.push({ studentId, score, finishedAt: new Date() });
//         }

//         await test.save();
//         res.status(200).json({ message: 'Score saved successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to save score', error });
//     }
// };
// exports.getTestScores = async (req, res) => {
//     try {
//         const { testId } = req.params;

//         const test = await Test.findById(testId).populate('studentsScores.studentId', 'userName email');

//         if (!test) return res.status(404).json({ message: 'Test not found' });

//         const scores = test.studentsScores.map(entry => ({
//             studentId: entry.studentId._id,
//             userName: entry.studentId.userName,
//             email: entry.studentId.email,
//             score: entry.score,
//             finishedAt: entry.finishedAt
//         }));

//         res.status(200).json({ scores });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to retrieve scores' });
//     }
// };
// // exports.getNewTests = async (req, res) => {
// //   const { lastLogin } = req.params;

// //   try {
// //     const newTests = await Test.find({
// //       createdAt: { $gt: new Date(lastLogin) }
// //     });

// //     res.status(200).json(newTests);
// //   } catch (error) {
// //     console.error('Error fetching new tests:', error);
// //     res.status(500).json({ message: 'Failed to retrieve new tests' });
// //   }
// // };

// // פונקציה חדשה - קבלת מבחנים שנוספו מאז ההתחברות האחרונה
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




const mongoose = require('mongoose');
const Test = require('../models/Test');

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

    if (existingScoreIndex !== -1) {
      test.studentsScores[existingScoreIndex].score = score;
      test.studentsScores[existingScoreIndex].finishedAt = new Date();
    } else {
      test.studentsScores.push({ studentId, score, finishedAt: new Date() });
    }

    await test.save();
    res.status(200).json({ message: 'Score saved successfully' });
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

// 5. מבחנים לפי קורס - למורה
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