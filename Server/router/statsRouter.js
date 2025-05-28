const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/:nameCours', statsController.getVideosCount);
router.get('/', statsController.getStats);

module.exports = router;
