const jwt = require('jsonwebtoken');

const GenerateAccessToken = (Payload) => {
    return jwt.sign(Payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const GenerateRefreshToken = (Payload) => {
    return jwt.sign(Payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
};

const VerifyRefreshToken = (Payload) => {
    jwt.verify(Payload, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return false;
        return true;
    });
};

module.exports = { GenerateAccessToken, GenerateRefreshToken, VerifyRefreshToken };