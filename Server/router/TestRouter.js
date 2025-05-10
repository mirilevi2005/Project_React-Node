const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController');

// ניהול המבחנים
router.post('/tests', testController.createTest);
router.get('/tests', testController.getTests);
router.get('/tests/:id', testController.getTestById);
router.put('/tests/:id', testController.updateTest);
router.delete('/tests/:id', testController.deleteTest);

module.exports = router;
