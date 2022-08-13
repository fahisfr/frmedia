const login = require("../controllers/login");
const signUp = require("../controllers/signUp");
const {
  verifyUserName,
  verifyEmail,
} = require("../controllers/verifyNameAndEmail");
const home = require("../controllers/home");
const getPost = require("../controllers/getPost");

const resolvers = {
  Query: {
    verifyUserName,
    verifyEmail,
    getPost,
    home,
  },

  Mutation: {
    login,
    signUp
  },
};

module.exports = resolvers;
