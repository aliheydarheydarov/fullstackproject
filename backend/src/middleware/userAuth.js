const users = require("./../controllers/userControllers.js");
const jwt = require("jsonwebtoken"); // Only one declaration

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. Authorization header missing.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.userId = decoded.user?.id || decoded['user.id']; // Access user ID from token
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check admin role
const checkAdmin = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(400).json({ error: 'Malformed Authorization header' });
  }

  const token = tokenParts[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    req.userId = decoded['user.id'];
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Token verification utility function (for token validity check)
const verifyToken2 = (req, res) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ valid: "not valid" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ valid: "not valid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    res.json({ valid: true, isAdmin: decoded.isAdmin, userId: decoded['user.id'] });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
};

module.exports = {
  verifyToken,
  verifyToken2,
  checkAdmin,
};
