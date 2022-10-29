const dbUser = require("../dbSchemas/user");
const jwt = require("jsonwebtoken");
const { createJwtTokens } = require("./helper");

const registerWithGoogle = (req, res, next) => {
  try {
    const { token, userName } = req.body;

    jwt.verify(token, process.env.NEXT_AUTH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.json({ status: "error", error: "url not valid" });
      const { name, email, picture } = jwt.decode(decoded.token);

      const user = await dbUser.findOne({ email });
      if (user) {
        if (user.registerWith === "google") {
          const { accessToken, refreshToken } = createJwtTokens({
            id: user._id,
            publicID: user.publicID,
          });
          res.cookie("auth_token", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: "strict",
          });
          return res.json({ status: "ok", token: accessToken });
        }
        return res.json({ status: "error", error: "email already registerd" });
      }
      if (!userName)
        return res.json({
          status: "setUserName",
          userName: name.replaceAll(" ", "").trim(),
        });
      const findUserName = await dbUser.findOne({ userName });

      if (findUserName) {
        return res.json({ status: "error", error: "UserName Already Taken" });
      }

      const newUser = await dbUser.create({
        userName,
        email,
        registerWith: "google",
        profilePic: picture,
      });
      if (!newUser) {
        return res.json({
          status: "error",
          error: "faild to create new account",
        });
      }
      const { accessToken, refreshToken } = createJwtTokens({
        id: newUser._id,
        publicID: newUser.publicID,
        userName: newUser.userName,
      });

      res.cookie("auth_token", refreshToken, {
        domain: process.env.DOMAIN_NAME,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.json({ status: "ok", token: accessToken });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerWithGoogle;
