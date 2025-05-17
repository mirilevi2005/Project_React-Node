
// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const {
//   addMaterial,
//   getMaterialsByCourseName,
//   getAllMaterials,
//   deleteMaterial,
//   updateMaterial, // 👈 נוסיף את הפונקציה הזו
// } = require("../controllers/LearningMaterialsController");

// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// // 📌 הגדרת אחסון Multer לפי שם קורס
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const courseName = req.params.nameCours;
//     const uploadPath = path.join(__dirname, "..", "uploads", courseName);
//     fs.mkdir(uploadPath, { recursive: true }, (err) => {
//       if (err) return cb(err, uploadPath);
//       cb(null, uploadPath);
//     });
//   },
//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

// // 📌 העלאת סרטון חדש לפי שם קורס
// router.post("/:nameCours", upload.single("video"), addMaterial);

// // 📌 קבלת כל הסרטונים של קורס מסוים
// router.get("/:nameCours", getMaterialsByCourseName);

// // 📌 מחיקת סרטון לפי מזהה
// router.delete("/material/:MaterialId", deleteMaterial);

// // ✅ עדכון שם סרטון לפי מזהה
// router.put("/:nameCours", upload.none(), updateMaterial); // לא נשלחת קובץ, רק FormData

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  addMaterial,
  getMaterialsByCourseName,
  getAllMaterials,
  deleteMaterial,
  updateMaterial,
} = require("../controllers/LearningMaterialsController");

// העלאת סרטון ל-Cloudinary לפי קורס
router.post("/:nameCours", upload.single("video"), addMaterial);

router.get("/:nameCours", getMaterialsByCourseName);
router.delete("/material/:MaterialId", deleteMaterial);
router.put("/:nameCours", upload.none(), updateMaterial);

module.exports = router;
