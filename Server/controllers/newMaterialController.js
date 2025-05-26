// const User = require('../models/User');
// const Video = require('../models/LearningMaterials');


// const getNewVideosSinceLastLogin = async (req, res) => {
//   try {
//     const { previousLogin } = req.query;

//     if (!previousLogin) {
//       return res.status(400).json({ message: 'Missing previous login timestamp' });
//     }

//     const newVideos = await Video.find({
//       uploadDate: { $gt: new Date(previousLogin) }
//     });

//     res.status(200).json(newVideos);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching new videos', error });
//   }
// };

// // עדכון lastLogin לאחר סגירת הפופאפ
// const updateLastLogin = async (req, res) => {
//   try {
//     // const userId = req.user.id;
//     const userId = req.user._id;
//     console.log("ppppppppppppppppp ",userId);
    

//     await User.findByIdAndUpdate(userId, { lastLogin: new Date() });
//     res.status(200).json({ message: 'Last login updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating last login', error });
//   }
// };

// module.exports = {
//   getNewVideosSinceLastLogin,
//   updateLastLogin
// };
const User = require('../models/User');
const Video = require('../models/LearningMaterials');

// const getNewVideosSinceLastLogin = async (req, res) => {
//   try {
//     const { since } = req.query;  // כאן שינינו ל-"since"

//     if (!since || isNaN(Date.parse(since))) {
//       return res.status(400).json({ message: 'Invalid or missing since timestamp' });
//     }

//     const newVideos = await Video.find({
//       uploadDate: { $gt: new Date(since) }  // משתמשים ב-"since" פה
//     });

//     res.status(200).json(newVideos);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching new videos', error });
//   }
// };
const getNewVideosSinceLastLogin = async (req, res) => {
  try {
    const { since } = req.query;

    if (!since || isNaN(Date.parse(since))) {
      return res.status(400).json({ message: 'Invalid or missing since timestamp' });
    }

    const newVideos = await Video.find({
      uploadDate: { $gt: new Date(since) }
    });

    // ממירים את האובייקטים לפורמט JSON נקי
    const videosWithCourse = newVideos.map(video => ({
      _id: video._id,
      nameCours: video.nameCours,
      uploadDate: video.uploadDate,
      finishDate: video.finishDate,
      videoPath: video.videoPath,
      videoName: video.videoName,
      originalVideoName:video.originalVideoName
    }));

    res.status(200).json(videosWithCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching new videos', error });
  }
};


// עדכון lastLogin לאחר סגירת הפופאפ
const updateLastLogin = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { lastLogin: new Date() });
    res.status(200).json({ message: 'Last login updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating last login', error });
  }
};

module.exports = {
  getNewVideosSinceLastLogin,
  updateLastLogin
};
