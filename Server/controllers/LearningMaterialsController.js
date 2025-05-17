

// const Material = require('../models/LearningMaterials');
// const upload = require('../middelware/multerConfig'); // ייבוא ה-upload שנמצא ב-multerConfig.js
// const fs = require('fs');
// const { default: mongoose } = require('mongoose');
// const path = require("path");



// exports.addMaterial = async (req, res) => {
//     try {
//         console.log("Received request body:", req.body);
//         console.log("Received file:", req.file);

//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         const nameCours = req.body.nameCours;
//         const uploadDate = req.body.uploadDate;
//         const finishDate = req.body.finishDate;
//         const videoName = req.body.videoName;

//         console.log(`Saving material for course: ${nameCours}, Video: ${videoName}`);
//         const _id = new mongoose.Types.ObjectId();

//         const newMaterial = new Material({
//             _id,
//             nameCours,
//             uploadDate,
//             finishDate,
//             videoPath: req.file.filename,
//             videoName,
//         });

//         await newMaterial.save();
//         res.status(201).json(newMaterial);
//     } catch (error) {
//         console.error("Error adding material:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };

  

// exports.getAllMaterials = async (req, res) => {
//     try {
//         const materials = await Material.find();
//         console.log(materials);
//         res.json(materials);
//     } catch (error) {
//         console.error('Failed to get materials:', error);
//         res.status(500).json({ message: 'Failed to get materials' });
//     }

//   };



// exports.getMaterialsByCourseName = async (req, res) => {
//     try {
//         const { nameCours } = req.params;
//         console.log("Fetching materials for course:", nameCours);

//         // חיפוש במסד הנתונים לפי שם הקורס
//         const materials = await Material.find({ nameCours });

//         if (!materials || materials.length === 0) {
//             return res.status(200).json({ message: "No videos found for this course", videos: [] });
//         }

//         // בדיקה אם הקבצים קיימים פיזית בשרת
//         const filteredMaterials = materials.filter(material => {
//             const videoPath = path.join(__dirname, "..", "uploads", nameCours, material.videoPath);
//             return fs.existsSync(videoPath);
//         });

//         if (filteredMaterials.length === 0) {
//             return res.status(200).json({ message: "No videos available on server", videos: [] });
//         }

//         // מחזירים את הרשימה של החומרים הקיימים
//         res.json({ videos: filteredMaterials });

//     } catch (error) {
//         console.error("Error fetching materials:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };

// exports.updateMaterial = async (req, res) => {
//     try {
//       const { _id, videoName } = req.body;
  
//       const updated = await Material.findByIdAndUpdate(
//         _id,
//         { videoName },
//         { new: true }
//       );
  
//       if (!updated) return res.status(404).json({ message: "Material not found" });
  
//       res.json(updated);
//     } catch (err) {
//       console.error("Update error:", err);
//       res.status(500).json({ message: "Server error updating material" });
//     }
//   };
  

// exports.deleteMaterial = async (req, res) => {
//     try {
//         const { MaterialId } = req.params;
//         const deletedMaterial = await Material.findByIdAndDelete(MaterialId);
        
//         if (!deletedMaterial) {
//             return res.status(404).json({ message: "Material not found" });
//         }

//         // יצירת הנתיב המלא של הקובץ (בתוך התיקייה של הקורס)
//         const videoPath = path.join(__dirname, "..", "uploads", deletedMaterial.nameCours, deletedMaterial.videoPath);
        
//         try {
//             await fs.promises.unlink(videoPath);
//             console.log("File deleted successfully:", videoPath);
//         } catch (err) {
//             console.error("Failed to delete file:", err);
//         }

//         res.json({ message: "Material and file deleted successfully" });

//     } catch (error) {
//         console.error("Failed to delete material:", error);
//         res.status(500).json({ message: "Failed to delete material" });
//     }
// };



const Material = require('../models/LearningMaterials');
const mongoose = require('mongoose');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

exports.addMaterial = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        console.log("Received file:", req.file);

        // אם לא הועלה קובץ, החזר שגיאה
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // פרמטרים מה-body
        const { nameCours, uploadDate, finishDate, videoName } = req.body;
        console.log(`Saving material for course: ${nameCours}, Video: ${videoName}`);

        // העלאת הווידאו ל-Cloudinary דרך stream
        const streamUpload = (buffer, videoName) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",  // מציין שזה וידאו
                        public_id: `course_materials/${videoName}`,  // שם ייחודי לקובץ
                        overwrite: true,  // אם יש כבר קובץ עם שם זהה, ידרוס אותו
                        chunk_size: 6000000,  // ניתן להגדיר גודל chunks כדי לאפשר העלאה של קבצים גדולים יותר
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);  // הצלחה
                        } else {
                            reject(error);  // שגיאה
                        }
                    }
                );

                // הופך את ה-buffer ל-stream ומחבר אותו ל-upload_stream
                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        // העלה את הווידאו
        const uploadResponse = await streamUpload(req.file.buffer, videoName);

        // יצירת אובייקט חדש ב-MongoDB
        const _id = new mongoose.Types.ObjectId();

        const newMaterial = new Material({
            _id,
            nameCours,
            uploadDate,
            finishDate,
            videoUrl: uploadResponse.secure_url,  // כתובת ה-URL של הווידאו ב-Cloudinary
            publicId: uploadResponse.public_id,
            videoName
        });
        console.log(uploadResponse.secure_url);

        // שמירה במסד הנתונים
        await newMaterial.save();
        res.status(201).json(newMaterial);  // החזרת אובייקט חדש עם סטטוס 201

    } catch (error) {
        console.error("Error adding material:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};




exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.find();
        console.log(materials);
        res.json(materials);
    } catch (error) {
        console.error('Failed to get materials:', error);
        res.status(500).json({ message: 'Failed to get materials' });
    }
};

exports.getMaterialsByCourseName = async (req, res) => {
    try {
        const { nameCours } = req.params;
        console.log("Fetching materials for course:", nameCours);

        // חיפוש במסד הנתונים לפי שם הקורס
        const materials = await Material.find({ nameCours });

        if (!materials || materials.length === 0) {
            return res.status(200).json({ message: "No videos found for this course", videos: [] });
        }

        // מחזירים את הרשימה של החומרים הקיימים
        res.json({ videos: materials });
    } catch (error) {
        console.error("Error fetching materials:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.updateMaterial = async (req, res) => {
    try {
        const { _id, videoName } = req.body;

        const updated = await Material.findByIdAndUpdate(
            _id,
            { videoName },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Material not found" });

        res.json(updated);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Server error updating material" });
    }
};

exports.deleteMaterial = async (req, res) => {
    try {
        const { MaterialId } = req.params;
        const deletedMaterial = await Material.findByIdAndDelete(MaterialId);
        
        if (!deletedMaterial) {
            return res.status(404).json({ message: "Material not found" });
        }

        // מחיקת הווידאו מ-Cloudinary
        const publicId = `course_materials/${deletedMaterial.videoName}`;
        await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

        res.json({ message: "Material and video deleted successfully" });

    } catch (error) {
        console.error("Failed to delete material:", error);
        res.status(500).json({ message: "Failed to delete material" });
    }
};
