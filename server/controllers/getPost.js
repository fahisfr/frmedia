const { dbPost } = require("../dbSchemas/post");

const getPost = async (_, { postId }) => {
  const post = await dbPost.findById(postId);
  return post;
};

module.exports = getPost;
