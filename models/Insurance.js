const mongoose = require('mongoose');

const policyApplicationSchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  drivingLicense: {
    type: String,
    required: true,
  },
  idProof: {
    type: String,
    required: true,
  },
  durationInMonths: {
    type: Number,
    required: true,
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  policyStartDate: {
    type: Date,
  },
  policyEndDate: {
    type: Date,
  },
  policyStatus: {
    type: String,
    enum: ['active', 'inactive','pending'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('insurances', policyApplicationSchema);