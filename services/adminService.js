const Policy = require('../models/Policy'); // Policy model


const createPolicy = async (policyData) => {
  try {
    const newPolicy = new Policy(policyData);
    return await newPolicy.save();
  } catch (error) {
    throw new Error(`Failed to create policy: ${error.message}`);
  }
};


const getAllPolicies = async () => {
  try {
    return await Policy.find();
  } catch (error) {
    throw new Error(`Failed to fetch policies: ${error.message}`);
  }
};


const getPolicyById = async (policyId) => {
  try {
    const policy = await Policy.findById(policyId);
    if (!policy) {
      throw new Error(`Policy with ID ${policyId} not found`);
    }
    return policy;
  } catch (error) {
    throw new Error(`Failed to fetch policy: ${error.message}`);
  }
};


const updatePolicyByNumber = async (policyNumber, updatedData) => {
  try {
    const updatedPolicy = await Policy.findOneAndUpdate(
      { policyNumber },
      { $set: updatedData },
      { new: true }
    );
    if (!updatedPolicy) {
      throw new Error(`Policy with number ${policyNumber} not found`);
    }
    return updatedPolicy;
  } catch (error) {
    throw new Error(`Failed to update policy: ${error.message}`);
  }
};


const deletePolicyByNumber = async (policyNumber) => {
  try {
    const deletedPolicy = await Policy.findOneAndDelete({ policyNumber });
    if (!deletedPolicy) {
      throw new Error(`Policy with number ${policyNumber} not found`);
    }
    return deletedPolicy;
  } catch (error) {
    throw new Error(`Failed to delete policy: ${error.message}`);
  }
};


const getPoliciesByType = async (policyType) => {
  try {
    const policies = await Policy.find({ policyType });
    if (policies.length === 0) {
      throw new Error(`No policies found for type: ${policyType}`);
    }
    return policies;
  } catch (error) {
    throw new Error(`Failed to fetch policies by type: ${error.message}`);
  }
};

module.exports = {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicyByNumber,
  deletePolicyByNumber,
  getPoliciesByType,
};