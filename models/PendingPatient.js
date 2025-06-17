const mongoose = require('mongoose');

const pendingPatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    date: { type: String, required: true },
    message: { type: String },
    branch: { type: String, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PendingPatient', pendingPatientSchema);