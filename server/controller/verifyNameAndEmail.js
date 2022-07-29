const dbUser = require("../dbSchemas/user");

const verifyUserName = async (_, { userName }) => {
  console.log(userName);
  const user = await dbUser.findOne({ userName }).exec();

  const result = user
    ? { approved: false, message: " Username already registered " }
    : { approved: true, message: "User name is available" };

  return result;
};

const verifyEmail = async (_, { email }) => {
  const user = await dbUser.findOne({ email });
  const result = user
    ? { approved: false, message: " Email already registered " }
    : { approved: true, message: "" };

  return result;
};

module.exports = { verifyUserName, verifyEmail };
