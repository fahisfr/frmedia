const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.auth_token;
  if (!token) return res.json({ success: false, message: "unauthorized" });
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.json({ success: false, message: "unauthorized" });
    req.user = decoded;
    next();
  });
};

module.exports = auth;
