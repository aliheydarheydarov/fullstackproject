var jwt = require("jsonwebtoken");
const users=require("./../controllers/userControllers.js");

// const postRefreshToken = (req, res) => {
//     const { refreshToken } = req.body;
    
//   if (!refreshToken) return res.sendStatus(401);

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
//     if (err) return res.sendStatus(403);

//     const newAccessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
//     res.json({ accessToken: newAccessToken});
//   });
// };


const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
  
  
    const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer token"
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.userId = decoded['user.id']; // Adjust according to your token's payload structure
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };



const verifyToken2 = (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    console.log("hello");
  
    if (!token) {
      return res.status(401).json({ valid: "not valid" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      return res.json({ valid: true, isAdmin: decoded.isAdmin });
    } catch (error) {
      console.log(error);
  
      return res.status(401).json({ valid: false });
    }
  };




  module.exports={
    verifyToken,
    verifyToken2
  
}

