const loginController = require("../controller/login");
const singUpController = require("../controller/signUp");
const { verifyUserName, verifyEmail } = require("../controller/verifyNameAndEmail");

const resolvers = {

  Query: {
    verifyUserName,
    verifyEmail
  },
  
  Mutation: {
    signUp:singUpController,
    login:loginController,
  }

};

module.exports = resolvers;
