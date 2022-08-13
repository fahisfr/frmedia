const dbUser = require("../dbSchemas/user");
const {INTERNAL_SERVER_ERROR} = require("../config/customErrors");

const verifyUserName = async (_, { userName }, { req, res }) => {
  
  try {
    const user = await dbUser.findOne({ userName });

    const result = user
      ? {
          __typename: "VerifyData",
          status: false,
          message: " Username already registered ",
        }
      : {
          __typename: "VerifyData",
          status: true,
          message: "User name is available",
        };

    return result;
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

const verifyEmail = async (_, { email }) => {
  try {
    const user = await dbUser.findOne({ email });
    const result = user
      ? {
          __typename: "VerifyData",
          status: false,
          message: " Email already registered ",
        }
      : { __filename: "VerifyData", status: true, message: "" };

    return result;
  } catch (error) {
    return INTERNAL_SERVER_ERROR;
  }
};

module.exports = { verifyUserName, verifyEmail };
