const dbUser = require("../dbSchemas/user");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const isEmail = id.includes("@");

    const user = await dbUser.findOne(
      {
        [isEmail ? "email" : "userName"]: id,
        password,
      },
      {
        _id: 1,
        publicID: 1,
      }
    );

    if (user) {
      const info = { id: user._id, publicID: user.publicID };
      const refreshToken = jwt.sign(info, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "40d",
      });

      const accessToken = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10s",
      });

      dbUser.updateOne({ _id: user._id }, { set: { refreshToken } });

      res.cookie("auth_token", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        domain:process.env.DOMAIN_NAME,
      });

      res.json({ status: "ok", token: accessToken });
      return;
    }
    res.json({
      status: "error",
      error: "UserName/Email or password is incorrect",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
