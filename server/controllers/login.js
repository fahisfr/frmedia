const dbUser = require("../dbSchemas/user");
const jwt = require("jsonwebtoken");
const { db } = require("../dbSchemas/post");

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
      console.log(info);
      const refreshToken = jwt.sign(info, process.env.TOKEN_SECRET, {
        expiresIn: "69d",
      });

      const accessToken = jwt.sign(info, process.env.TOKEN_SECRET, {
        expiresIn: "11d",
      });

      dbUser.updateOne({ _id: user._id }, { set: { refreshToken } });

      res.cookie("auth_token", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: "strict",
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
