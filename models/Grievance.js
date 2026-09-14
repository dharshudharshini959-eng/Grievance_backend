const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  grievanceId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },
  adminRemark: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('Grievance', grievanceSchema);
