const dbUser = require("../dbSchemas/user");
const {UserInputError} = require("apollo-server-express");
const jwt = require("jsonwebtoken");


const login = async (_,{email,password}) => {
  

    const findUser = await dbUser.findOne({ email, password });

    if (!findUser) {

      throw new UserInputError("Please check your email and password");

    }
    const token = jwt.sign({ name }, "secret", { expiresIn: "1h" });

    return {
      ...findUser,
      token,
    }

 
};

module.exports = login;