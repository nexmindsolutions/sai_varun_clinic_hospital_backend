const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER || 'nexmindsolutions@gmail.com',
        pass: process.env.EMAIL_PASS || 'mqvm ngfl gggp fetu'
    }
});

exports.sendAppointmentConfirmation = async (toEmail, patientName, appointmentDate, branch) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'nexmindsolutions@gmail.com',
            to: toEmail,
            subject: 'Appointment Confirmation',
            text: `Dear ${patientName},\n\nYour appointment for ${branch} has been confirmed for ${appointmentDate}.\n\nThank you for choosing our service.\n\nBest regards,\nHospital Team`
        };

        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent to:', toEmail);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = exports;