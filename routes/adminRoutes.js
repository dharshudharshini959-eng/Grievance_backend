const express = require('express');
const router = express.Router();
const { getAllGrievances, getGrievanceDetails, updateGrievance, deleteGrievance } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/grievances', protect, admin, getAllGrievances);
router.get('/grievances/:id', protect, admin, getGrievanceDetails);
router.put('/grievances/:id', protect, admin, updateGrievance);
router.delete('/grievances/:id', protect, admin, deleteGrievance);

module.exports = router;
