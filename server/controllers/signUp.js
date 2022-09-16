const dbUser = require("../dbSchemas/user");
const Jwt = require("jsonwebtoken");

const singUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const refreshToken = Jwt.sign({ userName }, "secret", { expiresIn: "17d" });

    dbUser
      .create({ userName, email, password, refreshToken })
      .then((user) => {
        const accessToken = Jwt.sign(
          { id: user._id, publicID: user.publicID },
          "secret",
          { expiresIn: "3d" }
        );
        res.json({ status: "ok", token: accessToken });
      })
      .catch(({ code, message }) => {
        if (code === 11000) {
          if (message.includes("userName")) {
            res.json({
              success: "error",
              error: "Username already registered",
            });
          } else if (message.includes("email")) {
            res.json({ status: "ok", error: "Email already registered" });
          }
        } else {
          throw new Error(message);
        }
      });
  } catch (error) {
    next(error);
  }
};
module.exports = singUp;
