
const express = require("express");
const router = express.Router();

  // 👈 נוסיף את הפונקציה הזו
const LearningMaterialsController= require("../controllers/LearningMaterialsController");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const verifyJWT = require("../middelware/verifyJWT");

// 📌 הגדרת אחסון Multer לפי שם קורס
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const courseName = req.params.nameCours;
    const uploadPath = path.join(__dirname, "..", "uploads", courseName);
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return cb(err, uploadPath);
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 📌 העלאת סרטון חדש לפי שם קורס
router.post("/:nameCours", upload.single("video"), LearningMaterialsController.addMaterial);

// 📌 קבלת כל הסרטונים של קורס מסוים
router.get("/:nameCours", LearningMaterialsController.getMaterialsByCourseName);

// 📌 מחיקת סרטון לפי מזהה
router.delete("/material/:MaterialId", LearningMaterialsController.deleteMaterial);

// ✅ עדכון שם סרטון לפי מזהה
router.put("/:nameCours", upload.none(), LearningMaterialsController.updateMaterial); // לא נשלחת קובץ, רק FormData


router.get('/material/:timestamp', verifyJWT, LearningMaterialsController.getNewVideosSince);

module.exports = router;