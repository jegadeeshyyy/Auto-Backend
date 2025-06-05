const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  };
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
  });

router.post(
  '/apply',
  upload.fields([{ name: 'drivingLicense' }, { name: 'idProof' }]),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  userController.applyPolicy
);


router.get('/policies', userController.getAllPolicies);

router.get('/policies/two-wheeler', userController.getTwoWheelerPolicies);

router.get('/policies/four-wheeler', userController.getFourWheelerPolicies);

router.get('/policies/heavy-vehicle', userController.getHeavyVehiclePolicies);
router.get('/applied-policies', userController.getAppliedPolicies);
router.get('/inactive-policies', userController.getInactivePolicies);
router.get('/active-policies', userController.getactivePolicies);
router.put('/renew/:applicationId', userController.renewPolicy);

module.exports = router;