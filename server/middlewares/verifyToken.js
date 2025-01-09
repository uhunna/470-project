const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.access_token;

  if (!token) {
    return res.status(403).json("You're not authenticated!");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    req.user = user;  // Attach user info to the request
    next();
  });
};

module.exports = verifyToken;