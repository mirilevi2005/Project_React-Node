
const jwt = require('jsonwebtoken');

const verifyJWTFromCookie = (req, res, next) => {
  const token = req.cookies?.token; // מניח שהטוקן שמור בקוקי בשם 'token'
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWTFromCookie;
