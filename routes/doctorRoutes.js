const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorController'); // lowercase 'd'

// Doctor registration and login
router.post('/register', DoctorController.register);
router.post('/login', DoctorController.login);

module.exports = router;