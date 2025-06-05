const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.post('/create', adminController.createPolicy);
router.get('/', adminController.getAllPolicies);
router.get('/:id', adminController.getPolicyById);
router.put('/update/:policyNumber', adminController.updatePolicyByNumber);
router.delete('/delete/:policyNumber', adminController.deletePolicy);

module.exports = router;