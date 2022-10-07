const dbUser = require("../dbSchemas/user");
const dbPost = require("../dbSchemas/post");

const deletePost = async (req, res, next) => {
  try {
    //for development purposes
    const { postId, userId } = req.body;
    console.log(postId, userId);

    const deletePostFromUser = await dbUser.updateOne(
      { publicID: userId },
      {
        $pull: {
          posts: {
            postId,
          },
        },
      }
    );
    const postDeleted = await dbPost.deleteOne({ _id: postId });
    if (deletePostFromUser && postDeleted) {
      return res.json({ status: "ok" });
    }
    res.json({ status: "error" });
  } catch (err) {
    next(err);
  }
};
module.exports = deletePost;
