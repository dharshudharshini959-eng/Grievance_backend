const Grievance = require('../models/Grievance');

// Helper to generate Grievance ID
const generateGrievanceId = async () => {
  const count = await Grievance.countDocuments();
  return `GRV${(count + 1).toString().padStart(3, '0')}`;
};

const submitGrievance = async (req, res) => {
  try {
    const { subject, category, description } = req.body;

    if (!subject || !category || !description) {
      return res.status(400).json({ message: 'Please provide subject, category, and description' });
    }

    const grievanceId = await generateGrievanceId();

    const grievance = await Grievance.create({
      grievanceId,
      userId: req.user.id,
      subject,
      category,
      description,
      status: 'Pending'
    });

    res.status(201).json(grievance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getGrievanceDetails = async (req, res) => {
  try {
    const grievance = await Grievance.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found or unauthorized' });
    }

    res.json(grievance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { submitGrievance, getMyGrievances, getGrievanceDetails };
