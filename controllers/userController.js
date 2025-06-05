const PolicyApplication = require('../models/Insurance');
const adminService = require('../services/adminService');
const userService = require('../services/userService');
const Policy = require('../models/Policy');


const applyPolicy = async (req, res) => {
    try {
        const { policyNumber, userName, email, durationInMonths } = req.body;

        
        if (!policyNumber || !userName || !email || !durationInMonths) {
            return res.status(400).json({ message: 'Policy number, user name, email, and duration are required.' });
        }

        
        const existingPolicy = await Policy.findOne({ policyNumber });
        if (!existingPolicy) {
            return res.status(404).json({ message: 'Policy not found.' });
        }

        
        if (!req.files || !req.files.drivingLicense || !req.files.idProof) {
            return res.status(400).json({ message: 'Both driving license and ID proof are required.' });
        }

        const policyStartDate = new Date();
        const policyEndDate = new Date();
        policyEndDate.setMonth(policyEndDate.getMonth() + parseInt(durationInMonths));

        
        const newApplication = new PolicyApplication({
            policyNumber,
            userName,
            email,
            drivingLicense: req.files.drivingLicense[0].path,
            idProof: req.files.idProof[0].path,
            durationInMonths,
            policyStartDate,
            policyEndDate,
        });
        const savedApplication = await newApplication.save();

        res.status(201).json({
            message: 'Policy application submitted successfully and is pending approval.',
            data: savedApplication,
        });
    } catch (error) {
        console.error('Error applying for policy:', error);
        res.status(500).json({ message: 'Failed to apply for policy', details: error.message });
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


const getTwoWheelerPolicies = async (req, res) => {
    try {
        const policies = await adminService.getPoliciesByType('two-wheeler');
        res.status(200).json({ message: 'Two-wheeler policies retrieved successfully', data: policies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getFourWheelerPolicies = async (req, res) => {
    try {
        const policies = await adminService.getPoliciesByType('four-wheeler');
        res.status(200).json({ message: 'Four-wheeler policies retrieved successfully', data: policies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHeavyVehiclePolicies = async (req, res) => {
    try {
        const policies = await adminService.getPoliciesByType('heavy-vehicle');
        res.status(200).json({ message: 'Heavy-wheeler policies retrieved successfully', data: policies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const renewPolicy = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { durationInMonths } = req.body;

        const updatedApplication = await userService.renewPolicyService(applicationId, durationInMonths);
        res.status(200).json({
            message: 'Policy renewed successfully.',
            data: updatedApplication,
        });
    } catch (error) {
        console.error('Error renewing policy:', error);
        res.status(500).json({ message: 'Failed to renew policy', details: error.message });
    }
};

const getAppliedPolicies = async (req, res) => {
    try {
        const filter = req.query.filter;
        const policies = await userService.getAppliedPoliciesService(filter);
        res.status(200).json(policies);
    } catch (error) {
        console.error('Error fetching applied policies:', error);
        res.status(500).json({ error: 'Failed to fetch applied policies' });
    }
};

const getInactivePolicies = async (req, res) => {
    try {
        const inactivePolicies = await userService.getInactivePoliciesService();
        res.status(200).json(inactivePolicies);
    } catch (error) {
        console.error('Error fetching inactive policies:', error);
        res.status(500).json({ error: 'Failed to fetch inactive policies', details: error.message });
    }
};

const getactivePolicies = async (req, res) => {
    try {
        const activePolicies = await userService.getactivePoliciesService();
        res.status(200).json(activePolicies);
    } catch (error) {
        console.error('Error fetching active policies:', error);
        res.status(500).json({ error: 'Failed to fetch active policies', details: error.message });
    }
};

module.exports = {
    applyPolicy,
    getAllPolicies,
    getTwoWheelerPolicies,
    getFourWheelerPolicies,
    getHeavyVehiclePolicies,
    renewPolicy,
    getAppliedPolicies,
    getInactivePolicies,
    getactivePolicies
};