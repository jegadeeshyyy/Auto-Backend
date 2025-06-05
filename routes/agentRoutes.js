const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');


router.get('/applications/pending', agentController.getPendingApplications);
router.get('/applications/approved', agentController.getApprovedApplications);
router.get('/applications/rejected', agentController.getRejectedApplications);

router.put('/applications/:_id/approve', agentController.approvePolicy);
router.put('/applications/:_id/reject', agentController.rejectPolicy);

module.exports = router;