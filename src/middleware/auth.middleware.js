const redisClient = require('../config/redis');
const jwt = require('jsonwebtoken');


async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const isblacklisted = await redisClient.get(token);
        if (isblacklisted) {
            return res.status(401).json({ message: 'token is invalid' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Error in auth middleware:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }


}

module.exports = { authUser };