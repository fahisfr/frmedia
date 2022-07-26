const dbUser = require("../dbSchemas/user");
const Jwt = require("jsonwebtoken");

const 
{
  UserInputError,
  INTERNAL_SERVER_ERROR,
}
 = require("apollo-server-express");

const singUp = async (_, args) => {

  const token = Jwt.sign({ name: args.name }, "secret", { expiresIn: "1h" });
  const refreshToken = Jwt.sign({ name: args.name }, "secret", {expiresIn: "7d",});

  await dbUser.create({...args,refreshToken,}).then((res) => {return {
      ...res._doc,
    }})
    .catch(({ code, message }) => {

      if (code === 11000) {
        if (message.includes("name")) {
         throw new UserInputError("Name already taken")

        } else if (message.includes("email")) {
          throw new UserInputError("Email already exists");
        }

      } else {
        throw new INTERNAL_SERVER_ERROR("oops something went wrong");
      }
    });
};
module.exports = singUp;
