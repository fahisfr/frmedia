const dbUser = require("../dbSchemas/user");

const verifyUserName = async (_, { userName },{req,res}) => {
 
  const user = await dbUser.findOne({ userName }).exec();

  const result = user
    ? { status: false, message: " Username already registered " }
    : { status: true, message: "User name is available" };

  return result;
};

const verifyEmail = async (_, { email }) => {
  const user = await dbUser.findOne({ email });
  const result = user
    ? { status: false, message: " Email already registered " }
    : { status: true, message: "" };

  return result;
};

module.exports = { verifyUserName, verifyEmail };
