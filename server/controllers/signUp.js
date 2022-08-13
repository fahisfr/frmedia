const dbUser = require("../dbSchemas/user");
const Jwt = require("jsonwebtoken");
const {INTERNAL_SERVER_ERROR} = require("../config/customErrors")



const singUp = async (_, args) => {
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
            return {
              __typename: "Error",
              message: "Username already registered",
            };
          } else if (message.includes("email")) {
            return {
              __typename: "Error",
              message: "Email already registered",
            };
          }
        } else {
          throw new Error(message);
        }
      });
  } catch (error) {
    return INTERNAL_SERVER_ERROR
  }
};
module.exports = singUp;
