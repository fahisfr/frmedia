const dbUser = require("../dbSchemas/user");
const jwt = require("jsonwebtoken");

const reAuth = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) return res.json({ status: "error", error: "token not fount" });
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.json({ status: "error" });
        const user = await dbUser.findOne({ _id: decoded.id });
        const newToken = jwt.sign(
          { id: user._id, publicID: user.publicID },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30m",
          }
        );
        return res.json({ status: "ok", token: newToken });
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = reAuth;
