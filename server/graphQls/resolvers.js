const loginController = require("../controllers/login");
const singUpController = require("../controllers/signUp");
const { verifyUserName, verifyEmail } = require("../controllers/verifyNameAndEmail");
const home = require("../controllers/home")
const getPost = require("../controllers/getPost")




const resolvers = {


  Query: {
    verifyUserName,
    verifyEmail,
    getPost,
    home

  },
  
  Mutation: {
    signUp:singUpController,
    login:loginController,
  }

};

module.exports = resolvers;
