const Material = require('../models/LearningMaterials')

exports.addMaterial = async(req,res)=>{

    const material = await Material.create(req.body);
    res.json(material)
}

exports.getAllMaterials = async (req, res) => {
    try {
      const materials = await Material.find();
      res.json(materials);
    } catch (error) {
      console.error('Failed to get materials:', error);
      res.status(500).json({ message: 'Failed to get materials' });
    }
  };