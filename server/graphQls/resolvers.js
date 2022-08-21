const login = require("../controllers/login");
const signUp = require("../controllers/signUp");
const home = require("../controllers/home");
const getPost = require("../controllers/getPost");
const getCommentReplies = require("../controllers/getCommentReplies");
const { likePost, unLikePost } = require("../controllers/postLikeAndUnLike");
const {likeComment,unLikeComment} = require("../controllers/commentLikeAndUnLike");
const {verifyUserName,verifyEmail} = require("../controllers/verifyNameAndEmail");
const { likeReply, unLikeReply } = require("../controllers/replyLikeAndUnLike");
const { follow, unFollow } = require("../controllers/followAndUnfollow");
const getUserInfo = require("../controllers/getUserInfo");
const resolvers = {
  Query: {
    verifyUserName,
    verifyEmail,
    getPost,
    home,
    getCommentReplies,
    getUserInfo
  },

  Mutation: {
    login,
    signUp,
    likePost,
    unLikePost,
    likeComment,
    unLikeComment,
    likeReply,
    unLikeReply,
    follow,
    unFollow,
  },
};

module.exports = resolvers;
