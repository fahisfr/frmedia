const dbUser = require("../dbSchemas/user");
const jwt = require("jsonwebtoken");
const { INTERNAL_SERVER_ERROR } = require("../config/customErrors");

const login = async (_, { nameOrEmail, password }, { res }) => {
  try {
    const isEmail = nameOrEmail.includes("@");

    const findUser = await dbUser.findOne({
      [isEmail ? "email" : "userName"]: nameOrEmail,
      password,
    });

    if (!findUser) {
      return {
        __typename: "Error",
        message: "Invalid username or password",
      };
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

    return {
      __typename: "Success",
      message: "login successfull",
    };
  } catch (error) {
    console.log(error);
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = login;
