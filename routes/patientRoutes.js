const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patientController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Public routes
router.post('/', PatientController.registerPatient);

// Protected routes (require doctor authentication)
router.use(authMiddleware);

router.get('/pending', PatientController.getPendingPatients);
router.get('/accepted', PatientController.getAcceptedPatients);
router.put('/:id/status', PatientController.updatePatientStatus);

module.exports = router;