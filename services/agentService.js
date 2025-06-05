const PolicyApplication = require('../models/Insurance');


const getPendingApplications = async () => {
  return await PolicyApplication.find({ approvalStatus: 'pending' });
};


const getApprovedApplications = async () => {
  return await PolicyApplication.find({ approvalStatus: 'approved' });
};


const getRejectedApplications = async () => {
  return await PolicyApplication.find({ approvalStatus: 'rejected' });
};


const approvePolicy = async (applicationId) => {
  const application = await PolicyApplication.findById(applicationId);
  if (!application) {
    throw new Error('Policy application not found.');
  }

  if (application.approvalStatus !== 'pending') {
    throw new Error('Policy application has already been processed.');
  }

  
  const policyStartDate = new Date();
  const policyEndDate = new Date();
  policyEndDate.setMonth(policyEndDate.getMonth() + application.durationInMonths);


  application.approvalStatus = 'approved';
  application.policyStartDate = policyStartDate;
  application.policyEndDate = policyEndDate;
  application.policyStatus = 'active';

  return await application.save();
};

const rejectPolicy = async (applicationId) => {
  const application = await PolicyApplication.findById(applicationId);
  if (!application) {
    throw new Error('Policy application not found.');
  }

  if (application.approvalStatus !== 'pending') {
    throw new Error('Policy application has already been processed.');
  }

  application.approvalStatus = 'rejected';
  application.policyStatus = 'pending';

  return await application.save();
};

module.exports = {
  getPendingApplications,
  approvePolicy,
  rejectPolicy,
  getApprovedApplications,
  getRejectedApplications
};