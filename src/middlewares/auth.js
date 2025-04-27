const jwt = require('jsonwebtoken');

const VerifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};


const RefreshToken = async (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    if (!refreshTokens.includes(token)) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
  
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired refresh token' });
  
      const newAccessToken = generateAccessToken({ id: user.ID });
  
      res.status(200).json({ accessToken: newAccessToken });
    });
  };

module.exports = {
    VerifyToken,
    RefreshToken
};