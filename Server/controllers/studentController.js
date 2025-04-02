const Material = require('../models/LearningMaterials')

exports.addMaterial = async(req,res)=>{
  {console.log("mirimiri");
  }
    const material = await Material.create(req.body);
    console.log(material);
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