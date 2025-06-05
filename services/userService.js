const Policy = require('../models/Policy');
const Insurance = require('../models/Insurance');


const getAvailablePolicies = async () => {
    try {
        return await Policy.find({ isActive: true });
    } catch (error) {
        throw new Error('Failed to retrieve policies: ' + error.message);
    }
};

const getInactivePoliciesService = async () => {
    try {
        return await Insurance.find({ policyStatus: 'inactive' });
    } catch (error) {
        console.error('Error fetching inactive policies:', error);
        throw error;
    }
};

const getactivePoliciesService = async () => {
    try {
        return await Insurance.find({ policyStatus: 'active' });
    } catch (error) {
        console.error('Error fetching active policies:', error);
        throw error;
    }
};

const applyForPolicy = async (userId, policyId, durationInMonths) => {
    try {
        const existingPolicy = await Policy.findById(policyId);
        if (!existingPolicy) {
            throw new Error('Policy not found');
        }

        const policyStartDate = new Date();
        const policyEndDate = new Date();
        policyEndDate.setMonth(policyEndDate.getMonth() + parseInt(durationInMonths));

        const application = new Insurance({
            userId,
            policyId,
            applicationStatus: 'pending',
            policyStartDate,
            policyEndDate,
            durationInMonths,
        });

        return await application.save();
    } catch (error) {
        throw new Error('Failed to apply for policy: ' + error.message);
    }
};

const getAppliedPoliciesService = async (filter) => {
    try {
        let policies;
        if (filter === 'approved') {
            policies = await Policy.find({ approvalStatus: 'approved' });
        } else if (filter === 'rejected') {
            policies = await Policy.find({ approvalStatus: 'rejected' });
        } else {
            policies = await Policy.find();
        }
        return policies;
    } catch (error) {
        console.error('Error fetching applied policies:', error);
        throw new Error('Failed to fetch applied policies');
    }
};

const renewPolicyService = async (applicationId, durationInMonths) => {
    try {
        const policyApplication = await Insurance.findById(applicationId);
        if (!policyApplication) {
            throw new Error('Policy application not found.');
        }

        if (policyApplication.policyStatus !== 'inactive') {
            throw new Error('Only inactive policies can be renewed.');
        }

        if (!durationInMonths || durationInMonths <= 0) {
            throw new Error('Duration in months should be a positive integer greater than 0.');
        }
        const currentEndDate = new Date(policyApplication.policyEndDate);
        const newEndDate = new Date(currentEndDate);
        newEndDate.setMonth(newEndDate.getMonth() + parseInt(durationInMonths));

        const policyStartDate = new Date(currentEndDate);
        policyStartDate.setDate(policyStartDate.getDate() + 1);

        policyApplication.durationInMonths = parseInt(durationInMonths);
        policyApplication.policyStartDate = policyStartDate;
        policyApplication.policyEndDate = newEndDate;
        policyApplication.policyStatus = 'active';

        const updatedApplication = await policyApplication.save();
        return updatedApplication;
    } catch (error) {
        console.error('Error renewing policy:', error);
        throw new Error('Failed to renew policy: ' + error.message);
    }
};

module.exports = {
    getAvailablePolicies,
    applyForPolicy,
    getInactivePoliciesService,
    getactivePoliciesService,
    getAppliedPoliciesService,
    renewPolicyService
};
