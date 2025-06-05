const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
    unique: true,
  },
  policyName: {
    type: String,
    required: true,
  },
  policyType: {
    type: String,
    enum: ['two-wheeler', 'four-wheeler', 'heavy-vehicle'],
    required: true,
  },
  premiumAmount: {
    type: Number,
    required: true,
  },
  coverageAmount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

policySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;