const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.doctorId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};