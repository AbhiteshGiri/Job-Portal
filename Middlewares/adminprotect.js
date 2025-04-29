const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');

const adminProtect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // only admins get tokens in cookies
    console.log(req.cookies)
    if (!token) {
      res.redirect("/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   console.log(decoded)
    if (decoded.id !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
     res.redirect("/Login");
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminProtect;