// const express = require('express');
// const  newMaterialController=require('../controllers/newMaterialController')
// const authenticate = require('../middelware/verifyJWT');

// const router = express.Router();

// router.get('/new-videos', authenticate, newMaterialController.getNewVideosSinceLastLogin);
// router.put('/update-last-login', authenticate, newMaterialController.updateLastLogin);

// module.exports = router;
const express = require('express');
const newMaterialController = require('../controllers/newMaterialController');
const authenticate = require('../middelware/verifyJWTFromCookie');  // כאן משנים ל־middleware החדש

const router = express.Router();

// router.get('/new-videos', authenticate, newMaterialController.getNewVideosSinceLastLogin);
router.get('/new-videos/:lastLogin', authenticate, newMaterialController.getNewVideosSinceLastLogin);

router.put('/update-last-login', authenticate, newMaterialController.updateLastLogin);

module.exports = router;
