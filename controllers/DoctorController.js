const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if doctor exists
        const existingDoctor = await Doctor.findOne({ $or: [{ username }, { email }] });
        if (existingDoctor) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create new doctor
        const doctor = new Doctor({ username, email, password });
        await doctor.save();

        // Generate JWT token
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '7d'
        });

        res.status(201).json({ token, doctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find doctor
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '7d'
        });

        res.json({ token, doctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};