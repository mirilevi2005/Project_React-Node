const User = require('../models/User');
const LearningMaterials = require('../models/LearningMaterials');

// exports.getStats = async (req, res) => {
//   try {
//     nameCours=req.nameCours;
//     const studentsCount = await User.countDocuments({ roles: 'student' });
//     const videosCount = await LearningMaterials.countDocuments();
//     const videos=await LearningMaterials.countDocuments({ nameCours: nameCours });
//     res.json({ studentsCount, videosCount,videos });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




// exports.getStats = async (req, res) => {
//   try {
//     console.log("getStats called with:", req.params.nameCours);
//     const studentsCount = await User.countDocuments({ roles: 'student' });

//     const nameCours = req.params.nameCours; // 1. קבלת שם הקורס מכתובת ה-URL

//     const videosCount = await LearningMaterials.countDocuments(); // 2. סופרים את כל הסרטונים במסד

//     const video = await LearningMaterials.countDocuments({ nameCours }); // 3. סופרים את הסרטונים של הקורס הספציפי

//     const courseList = await LearningMaterials.aggregate([ // 4. אגרגציה – קיבוץ לפי שם קורס
//       {
//         $group: {
//           _id: '$nameCours', // קיבוץ לפי שדה nameCours
//           videos: { $sum: 1 }, // סוכמים כמה סרטונים בכל קורס
//         },
//       },
//       {
//         $project: {
//           _id: 0, // מסתירים את _id
//           name: '$_id', // משנים את שם השדה ל-name
//           videos: 1, // משאירים את כמות הסרטונים
//         },
//       },
//     ]);

//     res.json({studentsCount, videosCount, video, courses: courseList }); // 5. מחזירים את כל הנתונים כ־JSON
//   } catch (err) {
//     console.error(err); // 6. במידה ויש שגיאה – מדפיסים אותה
//     res.status(500).json({ message: 'Server error' }); // 7. מחזירים סטטוס שגיאה ללקוח
//   }
// };

exports.getVideosCount = async (req, res) => {
  try {
    // אגרגציה שמחזירה את מספר הסרטונים לפי שם קורס
    // const videosCount = await LearningMaterials.aggregate([
    //   {
    //     $group: {
    //       _id: '$nameCours', // קיבוץ לפי שם הקורס
    //       videos: { $sum: 1 }, // סכימת מספר הסרטונים בקורס
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       name: '$_id', // שם הקורס
    //       videos: 1,    // מספר הסרטונים
    //     },
    //   },
    // ]);
    const nameCours = req.params.nameCours;
    const videoCountForCourse = await LearningMaterials.countDocuments({ nameCours });

    res.json(videoCountForCourse); // מחזיר מערך של VideoInfo
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const studentsCount = await User.countDocuments({ roles: 'student' });
    const videosCount = await LearningMaterials.countDocuments();
    res.json({
      studentsCount,
      videos: videosCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
