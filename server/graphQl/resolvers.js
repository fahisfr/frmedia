const loginController = require("../controller/login");
const singUpController = require("../controller/signUpController");

const resolvers = {
  
  Mutation: {
    signUp:singUpController,
    login:loginController,
  }

};

module.exports = resolvers;
