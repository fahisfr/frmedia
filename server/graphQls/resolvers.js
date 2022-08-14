const login = require("../controllers/login");
const signUp = require("../controllers/signUp");
const { likePost, unLikePost } = require("../controllers/likeAndUnLikePost");
const home = require("../controllers/home");
const getPost = require("../controllers/getPost");
const {
  verifyUserName,
  verifyEmail,
} = require("../controllers/verifyNameAndEmail");

const resolvers = {
  Query: {
    verifyUserName,
    verifyEmail,
    getPost,
    home,
  },

  Mutation: {
    login,
    signUp,
    likePost,
    unLikePost,
  },
};

module.exports = resolvers;
