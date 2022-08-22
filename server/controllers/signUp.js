const dbUser = require("../dbSchemas/user");
const Jwt = require("jsonwebtoken");
const { INTERNAL_SERVER_ERROR } = require("../config/customErrors");

const singUp = async (req, res, next) => {
  try {
    const token = Jwt.sign({ userName: args.userName }, "secret", {
      expiresIn: "1h",
    });
    const refreshToken = Jwt.sign({ userName: args.userName }, "secret", {
      expiresIn: "17d",
    });

    await dbUser
      .create({ ...args, refreshToken })
      .then((res) => {
        return {
          ...res._doc,
        };
      })
      .catch(({ code, message }) => {
        if (code === 11000) {
          if (message.includes("userName")) {
            res.json({ success: "error", error: "Username already registered",});
          } else if (message.includes("email")) {
            res.json({ status:"ok", error: "Email already registered" });
          }
        } else {
          throw new Error(message);
        }
      });
  } catch (error) {
    next()
  }
};
module.exports = singUp;
