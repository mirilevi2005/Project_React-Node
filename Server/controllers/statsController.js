const User = require('../models/User');
const LearningMaterials = require('../models/LearningMaterials');

exports.getStats = async (req, res) => {
  try {
    const studentsCount = await User.countDocuments({ roles: 'student' });
    const videosCount = await LearningMaterials.countDocuments();

    res.json({ studentsCount, videosCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
