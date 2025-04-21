// const user = require('../controllers/user');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers[process.env.JWT_HEADER_KEY];
    if (!token) {
        return res.status(403).send("Token failed");
    }
    try {
        let jwtSecret = process.env.JWT_SECRET;
        const verified = jwt.verify(token, jwtSecret);
        // const isVerified = await user.TokenVerification(token);
        if (verified) return next();
        return res.status(401).send("Invalid Token");
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

module.exports = verifyToken;