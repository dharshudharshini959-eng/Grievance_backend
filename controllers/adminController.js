const Grievance = require('../models/Grievance');

const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getGrievanceDetails = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id).populate('userId', 'name email');
    
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.json(grievance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateGrievance = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;
    
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    if (status) grievance.status = status;
    if (adminRemark !== undefined) grievance.adminRemark = adminRemark;

    const updatedGrievance = await grievance.save();
    res.json(updatedGrievance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteGrievance = async (req, res) => {
    try {
      const grievance = await Grievance.findById(req.params.id);
  
      if (!grievance) {
        return res.status(404).json({ message: 'Grievance not found' });
      }
  
      await grievance.deleteOne();
      res.json({ message: 'Grievance removed' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

module.exports = { getAllGrievances, getGrievanceDetails, updateGrievance, deleteGrievance };
