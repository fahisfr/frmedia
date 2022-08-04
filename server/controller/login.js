const dbUser = require("../dbSchemas/user");
const { UserInputError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");



const login = async (_, { nameOrEmail, password },{res} ) => {
  
  const isEmail = nameOrEmail.includes("@");

  const findUser = await dbUser.findOne({[isEmail ? "email" : "userName"]: nameOrEmail,password,});

  if (!findUser) {
    throw new UserInputError("Please check your Username/Email address and password");
  }

  const token = jwt.sign({ id:findUser._id },process.env.TOKEN_SECRET, { expiresIn: "4d" });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: "strict",
  });

  return { ...findUser._doc, token };
};

module.exports = login;
