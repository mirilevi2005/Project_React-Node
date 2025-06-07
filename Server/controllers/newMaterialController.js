
const User = require('../models/User');
const Video = require('../models/LearningMaterials');

exports.updateLastLogin = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { lastLogin: new Date() });
    res.status(200).json({ message: 'Last login updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating last login', error });
  }
};

exports.getNewVideosSinceLastLogin = async (req, res) => {
  
  try {
    const { lastLogin } = req.params;

    if (!lastLogin || isNaN(Date.parse(lastLogin))) {
      return res.status(400).json({ message: 'Invalid or missing lastLogin timestamp' });
    }

    const newVideos = await Video.find({
      uploadDate: { $gt: new Date(lastLogin) }
    });

    const videosWithCourse = newVideos.map(video => ({
      _id: video._id,
      nameCours: video.nameCours,
      uploadDate: video.uploadDate,
      finishDate: video.finishDate,
      videoPath: video.videoPath,
      videoName: video.videoName,
      originalVideoName: video.originalVideoName
    }));

    res.status(200).json(videosWithCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching new videos', error });
  }
};


