const dbUser = require("../dbSchemas/user");
const { UserInputError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");



const login = async (_, { nameOrEmail, password },context ) => {
  
  const isEmail = nameOrEmail.includes("@");

  const findUser = await dbUser.findOne({[isEmail ? "email" : "userName"]: nameOrEmail,password,});

  if (!findUser) {
    throw new UserInputError("Please check your Username/Email address and password");
  }

  const token = jwt.sign({ nameOrEmail }, "secret", { expiresIn: "1h" });
 
  return { ...findUser._doc, token };
};

module.exports = login;
