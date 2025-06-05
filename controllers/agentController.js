const agentService = require('../services/agentService');


const getPendingApplications = async (req, res) => {
  try {
    const applications = await agentService.getPendingApplications();
    res.status(200).json({ message: 'Pending applications retrieved successfully', data: applications });
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ message: 'Failed to fetch pending applications', details: error.message });
  }
};

const getApprovedApplications = async (req, res) => {
  try {
    const applications = await agentService.getApprovedApplications();
    res.status(200).json({ message: 'approved applications retrieved successfully', data: applications });
  } catch (error) {
    console.error('Error fetching approved applications:', error);
    res.status(500).json({ message: 'Failed to fetch approved applications', details: error.message });
  }
};

const getRejectedApplications = async (req, res) => {
  try {
    const applications = await agentService.getRejectedApplications();
    res.status(200).json({ message: 'rejected applications retrieved successfully', data: applications });
  } catch (error) {
    console.error('Error fetching rejected applications:', error);
    res.status(500).json({ message: 'Failed to fetch rejected applications', details: error.message });
  }
};


const approvePolicy = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedApplication = await agentService.approvePolicy(_id);
    res.status(200).json({ message: 'Policy approved successfully.', data: updatedApplication });
  } catch (error) {
    console.error('Error approving policy:', error);
    if (error.message === 'Policy application not found.' || error.message === 'Policy application has already been processed.') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to approve policy', details: error.message });
  }
};


const rejectPolicy = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedApplication = await agentService.rejectPolicy(_id);
    res.status(200).json({ message: 'Policy rejected successfully.', data: updatedApplication });
  } catch (error) {
    console.error('Error rejecting policy:', error);
    if (error.message === 'Policy application not found.' || error.message === 'Policy application has already been processed.') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to reject policy', details: error.message });
  }
};

module.exports = {
  getPendingApplications,
  approvePolicy,
  rejectPolicy,
  getApprovedApplications,
  getRejectedApplications
};