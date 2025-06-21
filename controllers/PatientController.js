const PendingPatient = require('../models/PendingPatient');
const AcceptedPatient = require('../models/AcceptedPatient');
const RejectedPatient = require('../models/RejectedPatient');
const emailService = require('../utils/emailService');

exports.registerPatient = async (req, res) => {
    try {
        const { name, phone, gender, date, message, branch } = req.body;

        const patient = new PendingPatient({
            name, phone, gender, date, message, branch
        });

        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPendingPatients = async (req, res) => {
    try {
        const patients = await PendingPatient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAcceptedPatients = async (req, res) => {
    try {
        const patients = await AcceptedPatient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.updatePatientStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // console.log(req.body)

        const pendingPatient = await PendingPatient.findById(id);
        if (!pendingPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        if (status === 'accepted') {
            const acceptedPatient = new AcceptedPatient(pendingPatient.toObject());
            await acceptedPatient.save();
            await PendingPatient.findByIdAndDelete(id);

            // ✅ Respond to frontend immediately
            res.json({ message: 'Patient accepted', patient: acceptedPatient });
        }
        // 🔄 Send email in the background (no await)
        //     emailService.sendAppointmentConfirmation(
        //         pendingPatient.email,
        //         pendingPatient.name,
        //         pendingPatient.date,
        //         pendingPatient.branch
        //     ).catch(err => console.error('Email send failed:', err));

        // } else if (status === 'rejected') {
        //     const rejectedPatient = new RejectedPatient(pendingPatient.toObject());
        //     await rejectedPatient.save();
        //     await PendingPatient.findByIdAndDelete(id);

        //     res.json({ message: 'Patient rejected', patient: rejectedPatient });
        // } else {
        //     return res.status(400).json({ error: 'Invalid status' });
        // }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
