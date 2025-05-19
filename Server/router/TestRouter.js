
const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController');

// יצירת מבחן
router.post('/', testController.createTest);

// קבלת כל המבחנים
router.get('/', testController.getTests);

// מבחנים לפי קורס
 router.get('/course/:courseName', testController.getTestByCourse);
  router.get('/courseForTeacher/:courseName', testController.getTestsByCourseForTeacher);



// התחלת מבחן לפני נתיב לפי ID
router.post('/start/:testId', testController.startTest); // במקום GET


// שליחת ציון
router.post('/:testId/submit-score', testController.submitScore);


// ניהול לפי ID (אחרי הנתיבים המיוחדים)
router.post('/:id', testController.getTestById);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);

module.exports = router;
