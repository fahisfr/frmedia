const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
  const token = req.header.auth_token;
  
  if (!token) return res.json({success:false,message:"unauthorized"});
  

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    console.log(err)

    if (err) return res.json({ success: false, message: "unauthorized" });
    console.log(decoded);
    req.user = decoded;
    next()
  });
};

module.exports = auth;
