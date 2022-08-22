const dbUser = require("../dbSchemas/user");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const isEmail = nameOrEmail.includes("@");

    const findUser = await dbUser.findOne({
      [isEmail ? "email" : "userName"]: nameOrEmail,
      password,
    });

    if (!findUser) {
      res.json({
        status: "error",
        error: "UserName/Email or password is incorrect",
      });
    }

    const token = jwt.sign(
      { id: findUser._id, userName: findUser.userName },
      process.env.TOKEN_SECRET,
      { expiresIn: "69d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "strict",
    });

    res.json({ status:"ok" });
  } catch (error) {
    next();
  }
};

module.exports = login;
