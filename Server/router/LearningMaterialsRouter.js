
// const express = require("express");
// const router = express.Router();
// const { addMaterial, getAllMaterials, deleteMaterial,getByNameCours } = require("../controllers/LearningMaterialsController");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// // הגדרת Multer כדי לשמור קבצים בתיקיה דינמית לפי שם קורס
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const courseName = req.params.nameCours;  // שם הקורס מתוך ה-URL
//     const uploadPath = path.join(__dirname, "..", "uploads", courseName);

//     // אם התיקייה לא קיימת, ניצור אותה
//     fs.mkdir(uploadPath, { recursive: true }, (err) => {
//       if (err) {
//         console.error("Error creating folder:", err);
//         return cb(err, uploadPath);
//       }
//       cb(null, uploadPath);  // המיקום בו נשמור את הקובץ
//     });
//   },

//   filename: (req, file, cb) => {
//     // פונקציה ליצירת שם קובץ ייחודי
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
// }
// });

// // הגדרת ה- multer עם ה-storage
// const upload = multer({ storage });

// // נתיב להעלאת חומר לימוד לפי שם קורס (מוגדר ב-URL)
// router.post("/:nameCours", upload.single("video"), addMaterial);

// // // נתיב לשליפת כל החומרים לפי שם קורס
// // router.get("/:nameCours", getAllMaterials);


// // נתיב לשליפת כל החומרים של קורס מסוים
// router.get("/:nameCours", getMaterialsByCourseName);

// // נתיב למחיקת חומר לימוד לפי ID
// router.delete("/material/:MaterialId", deleteMaterial);

// // נתיב להעלאת סרטון
// router.post("/upload", upload.single("video"), async (req, res) => {
//   res.json({ videoPath: `/uploads/${req.file.filename}` });
// });

// module.exports = router;








const express = require("express");
const router = express.Router();
const { addMaterial, getMaterialsByCourseName,getAllMaterials, deleteMaterial } = require("../controllers/LearningMaterialsController");
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

module.exports = router;

