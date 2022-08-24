const dbUser = require("../dbSchemas/user");
const jwt = require("jsonwebtoken");
const { db } = require("../dbSchemas/post");

const login = async (req, res, next) => {
  try {
    const {id,password} =req.body
    const isEmail = id.includes("@");

    const user = await dbUser.findOne({
      [isEmail ? "email" : "userName"]: id,
      password,
    });

    if (!user) {
      res.json({
        status: "error",
        error: "UserName/Email or password is incorrect",
      });
    }

    const refreshToken = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.TOKEN_SECRET,
      { expiresIn: "69d" }
    );

    const accessToken = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    dbUser.updateOne({_id:user._id},{
      set:{
        refreshToken
      }
    })

    res.cookie("auth_token", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "strict",
    });

    res.json({ status: "ok", token: accessToken });
  } catch (error) {
    next();
  }
};

module.exports = login;
