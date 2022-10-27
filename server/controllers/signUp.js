const dbUser = require("../dbSchemas/user");
const { createJwtTokens } = require("./helper");
const singUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const findUserNameOrEmail = dbUser.findOne({ userName, email });

    if (findUserNameOrEmail) {
      res.json({ status: "error", error: "UserName or Email already registerd" });
    }

    const newUser = await dbUser.create({ userName, email, password, refreshToken });

    if (newUser) {
      const { accessToken, refreshToken } = createJwtTokens({
        id: newUser,
        publicID: newUser.publicID,
        userName,
      });
      res.json({ status: "ok", token: accessToken });

      dbUser.updateOne({ _id: newUser._id }, { refreshToken });
      return;
    }
    res.json({ status: "error", error: "faild to create account" });
  } catch (error) {
    next(error);
  }
};
module.exports = singUp;
