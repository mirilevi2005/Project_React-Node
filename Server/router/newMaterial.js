
const express = require('express');
const newMaterialController = require('../controllers/newMaterialController');
const authenticate = require('../middelware/verifyJWTFromCookie');  

const router = express.Router();

router.get('/new-videos/:lastLogin', authenticate, newMaterialController.getNewVideosSinceLastLogin);

router.put('/update-last-login', authenticate, newMaterialController.updateLastLogin);

module.exports = router;
