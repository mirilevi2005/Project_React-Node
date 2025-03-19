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


  exports.deleteMaterial= async (req, res) => {
  const  {MaterialId}  = req.params;
  console.log(MaterialId);
    try {
      const deletedMaterial = await User.findOneAndDelete({ MaterialId: _id });
      if (!deletedMaterial) {
        return res.status(404).json({ message: 'material  not found' });
      }
      res.json({ message: 'material  deleted successfully' });
    } catch (error) {
      console.error('Failed to delete material:', error);
      res.status(500).json({ message: 'Failed to delete material' });
    }
  };

