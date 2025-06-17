const app = require('./app');
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// allAPis



// http://localhost:5500/api/doctors/register
// http://localhost:5500/api/doctors/login
// http://localhost:5500/api/patients
// http://localhost:5500/api/patients/pending
// http://localhost:5500/api/patients/accepted
// http://localhost:5500/api/patients/6851417c10c9e68573e0acf4/status