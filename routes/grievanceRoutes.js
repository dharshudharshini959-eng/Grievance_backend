const express = require('express');
const router = express.Router();
const { submitGrievance, getMyGrievances, getGrievanceDetails } = require('../controllers/grievanceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, submitGrievance);
router.get('/my', protect, getMyGrievances);
router.get('/:id', protect, getGrievanceDetails);

module.exports = router;
