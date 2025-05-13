// const express = require('express');
// const router = express.Router();
// const testController = require('../controllers/TestController');

// // ניהול המבחנים
// router.post('/', testController.createTest);
// // router.get('/', testController.getTests);
// router.get('/:courseName', testController.getTestByCourse);

// router.get('/:id', testController.getTestById);
// router.put('/:id', testController.updateTest);
// router.delete('/:id', testController.deleteTest);

//  module.exports = router;

const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController');

// ניהול המבחנים
router.post('/', testController.createTest);
router.get('/', testController.getTests); // חשוב שזה יהיה לפני נתיבי :id

// נתיב ברור לפי קורס
router.get('/course/:courseName', testController.getTestByCourse);

// נתיבים לפי ID
router.get('/:id', testController.getTestById);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);

module.exports = router;
