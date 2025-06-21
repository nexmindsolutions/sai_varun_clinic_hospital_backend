const mongoose = require('mongoose');

const acceptedPatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    date: { type: String, required: true },
    message: { type: String },
    branch: { type: String, required: true },
    acceptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AcceptedPatient', acceptedPatientSchema);