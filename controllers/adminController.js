const adminService = require('../services/adminService'); 


const createPolicy = async (req, res) => {
  try {
    const policyData = req.body;
    const newPolicy = await adminService.createPolicy(policyData);
    res.status(201).json({ message: 'Policy created successfully', data: newPolicy });
  } catch (error) {
    console.error('Error creating policy:', error);
    res.status(500).json({ error: 'Failed to create policy', details: error.message });
  }
};


const getAllPolicies = async (req, res) => {
  try {
    const policies = await adminService.getAllPolicies();
    res.status(200).json(policies);
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({ error: 'Failed to fetch policies', details: error.message });
  }
};


const getPolicyById = async (req, res) => {
  try {
    const policyId = req.params.id;
    const policy = await adminService.getPolicyById(policyId);
    if (!policy) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.status(200).json(policy);
  } catch (error) {
    console.error('Error fetching policy by ID:', error);
    res.status(500).json({ error: 'Failed to fetch policy', details: error.message });
  }
};


const updatePolicyByNumber = async (req, res) => {
  try {
    const policyNumber = req.params.policyNumber;
    const updatedData = req.body;
    const updatedPolicy = await adminService.updatePolicyByNumber(policyNumber, updatedData);
    if (!updatedPolicy) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.status(200).json({ message: 'Policy updated successfully', data: updatedPolicy });
  } catch (error) {
    console.error('Error updating policy:', error);
    res.status(500).json({ error: 'Failed to update policy', details: error.message });
  }
};


const deletePolicy = async (req, res) => {
    try {
      const { policyNumber } = req.params;
  
      const deletedPolicy = await adminService.deletePolicyByNumber(policyNumber);
  
      if (!deletedPolicy) {
        return res.status(404).json({ message: 'Policy not found' });
      }
  
      res.status(200).json({ message: 'Policy deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicyByNumber,
  deletePolicy,
};