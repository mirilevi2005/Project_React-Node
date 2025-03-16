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


  exports.updateMaterial = async (req, res) => {
    const { MaterialId } = req.params;
    const { nameMaterial } = req.body;
  
    try {
      const updatedMaterial = await Material.findOneAndUpdate(
        {LearningMaterialId:MaterialId},
        {nameMaterial},
        { new: true }
      );
  
      if (!updatedMaterial) {
        return res.status(404).json({ message: 'material not found' });
      }
  
      res.json(updatedMaterial);

    } catch (error) {
      console.error('Failed to update material  :', error);
      res.status(500).json({ message: 'Failed to update material ' });
    }
  };
  
  exports.deleteMaterial= async (req, res) => {
  const  {MaterialId}  = req.params;
  console.log(MaterialId);
    try {
      const deletedMaterial = await User.findOneAndDelete({ LearningMaterialId: MaterialId });
      if (!deletedMaterial) {
        return res.status(404).json({ message: 'material  not found' });
      }
      res.json({ message: 'material  deleted successfully' });
    } catch (error) {
      console.error('Failed to delete material:', error);
      res.status(500).json({ message: 'Failed to delete material' });
    }
  };


  // exports.getUserByName = async (req, res) => {
  //   const { name } = req.params;
  //   console.log(name)
  
  //   try {
  //     const user = await User.findOne({ name });
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  //     res.json(user);
  //   } catch (error) {
  //     console.error('Failed to get user:', error);
  //     res.status(500).json({ message: 'Failed to get user' });
  //   }
  // };

