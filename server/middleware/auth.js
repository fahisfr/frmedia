const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
  const cookie = req.cookies.auth_token;
  
  if (!cookie) return res.json({success:false,message:"unauthorized"});
  console.log(cookie);

  jwt.verify(cookie, process.env.TOKEN_SECRET, (err, decoded) => {
    console.log(err)

    if (err) return res.json({ success: false, message: "unauthorized" });
    console.log(decoded);
    req.user = decoded;
    next()
  });
};

module.exports = auth;
