
const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController');

// יצירת מבחן
router.post('/', testController.createTest);

// קבלת כל המבחנים
router.get('/', testController.getTests);

// מבחנים לפי קורס (לסטודנט)
router.get('/course/:courseName', testController.getTestByCourse);
router.get('/new/:lastLogin', testController.getNewTests);

// מבחנים לפי קורס (למורה)
router.get('/courseForTeacher/:courseName', testController.getTestsByCourseForTeacher);
// התחלת מבחן (רישום התחלה) - POST
router.post('/start/:testId', testController.startTest);

// שליחת ציון מבחן
router.post('/:testId/submit-score', testController.submitScore);

// ניהול מבחן לפי ID
router.post('/:id', testController.getTestById);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);
// קבלת ציוני תלמידות למבחן לפי ID
router.get('/scores/:testId', testController.getTestScores);
// שליפת מבחנים חדשים (5 ימים אחרונים) שעדיין לא נפתרו ע"י תלמידה
router.get("/recent/:studentId", testController.getUpcomingTestsForStudent);

module.exports = router;
