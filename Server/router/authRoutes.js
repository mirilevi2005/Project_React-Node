


// const express = require('express');
// const router = express.Router();
// const authController = require("../controllers/authController")
// const UserLecturers=require('../models/lecturers');
// router.post('/', authController.singUpLecturers, async (req, res, next) => {
//     try {
//         await UserLecturers.create(req.body);
//         res.status(201).json({ message: 'משתמש נוצר בהצלחה' });
//         const token = result.email.toString() + ' ' + result.password.toString();
//         res.cookie('token', token, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === 'development',
//           sameSite: 'strict',
//           maxAge: 3600000, 
//         });
    
//         res.send(result); 
//         next();
//     } catch (error) {
//         console.error('שגיאה בהוספת משתמש:', error);
//         res.status(500).json({ message: 'שגיאה פנימית בשרת' });
//         next(error);
//     }
// });


// module.exports = router;


