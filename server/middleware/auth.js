const jwt = require("jsonwebtoken");

const authRequied = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ status: "error", error: "unauthorized" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ status: "error", error: "token not valid" });

    req.user = decoded;
    next();
  });
};

const auth = (req, res, next) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (!err) {
      req.user = decoded;
    }
    next();
  });
};

module.exports = {
  authRequied,
  auth,
};
