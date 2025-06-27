const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const doctorRoutes = require('./routes/doctorRoutes.js');
const patientRoutes = require('./routes/patientRoutes.js');

const app = express();

// Database connection
mongoose.connect('mongodb://varunclinic:Varun%231clinic@13.203.245.50:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = app;