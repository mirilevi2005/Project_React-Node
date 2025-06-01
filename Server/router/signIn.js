const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
router.post('/', authController.signIn);
router.post('/forgot-password', authController.forgotPassword);
router.post('/change-password', authController.changePassword);
router.post('/verify-temp-password', authController.verifyTempPassword);
router.post('/google-login', authController.googleLogin); // 👈
router.post("/send-magic-link", authController.sendMagicLinkEmail);



module.exports = router;
