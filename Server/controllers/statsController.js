const User = require('../models/User');
const LearningMaterials = require('../models/LearningMaterials');


exports.getVideosCount = async (req, res) => {
  try {
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
