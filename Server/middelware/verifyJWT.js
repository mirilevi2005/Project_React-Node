// const jwt = require('jsonwebtoken')
//  const verifyJWT = (req, res, next) => {
//  const authHeader = req.headers.authorization ||
//  req.headers.Authorization
//  if (!authHeader?.startsWith('Bearer ')) {
//  return res.status(401).json({ message: 'Unauthorized' })
//  }
//  const token = authHeader.split(' ')[1]
//  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decoded) => {
//  if (err) return res.status(403).json({ message:'Forbidden' })
//  req.user = decoded
//  next()
//  })}
//  module.exports = verifyJWT



const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token received:", token); // הוסף את זה לבדוק אם הטוקן התקבל

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = decoded; // שומר את המידע על המשתמש בתוך הבקשה
        next(); // ממשיכים לנתיב הבא
    });
};

module.exports = verifyJWT;
