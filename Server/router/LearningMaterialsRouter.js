
const express = require("express");
const router = express.Router();
const { addMaterial, getMaterialsByCourseName,getFinishDateByVideoName, deleteMaterial } = require("../controllers/LearningMaterialsController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// 📌 נתיב להעלאה לפי שם קורס
router.post("/:nameCours", upload.single("video"), addMaterial);

// 📌 נתיב לקבלת כל הסרטונים של קורס מסוים
router.get("/:nameCours", getMaterialsByCourseName);

// 📌 נתיב למחיקת סרטון לפי מזהה
router.delete("/material/:MaterialId", deleteMaterial);

router.get("/finish-date/:videoName", getFinishDateByVideoName);

module.exports = router;

