// const express = require('express');
// const router = express.Router();
// const testController = require('../controllers/TestController');

// // ניהול המבחנים
// router.post('/', testController.createTest);
// router.get('/', testController.getTests); // חשוב שזה יהיה לפני נתיבי :id

// // נתיב ברור לפי קורס
// router.get('/course/:courseName', testController.getTestByCourse);

// // נתיבים לפי ID
// router.get('/:id', testController.getTestById);
// router.put('/:id', testController.updateTest);
// router.delete('/:id', testController.deleteTest);
// router.post('/start/:testId',testController.startTest)
// router.post('/:testId/score', testController.submitScore);

// module.exports = router;


const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController');

// יצירת מבחן
router.post('/', testController.createTest);

// קבלת כל המבחנים
router.get('/', testController.getTests);

// מבחנים לפי קורס
 router.get('/course/:courseName', testController.getTestByCourse);

// התחלת מבחן לפני נתיב לפי ID
// router.get('/start/:testId', testController.startTest);
router.post('/start/:testId', testController.startTest); // במקום GET


// שליחת ציון
// router.post('/submit-score', testController.submitScore);
router.post('/:testId/submit-score', testController.submitScore);


// ניהול לפי ID (אחרי הנתיבים המיוחדים)
router.post('/:id', testController.getTestById);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);

module.exports = router;
