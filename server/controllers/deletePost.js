const dbUser = require("../dbSchemas/user");
const dbPost = require("../dbSchemas/post");

const deletePost = async (req, res, next) => {
  try {
    const {
      user: { id, publicID },
      body: { postId },
    } = req;

   

    const deletePostIdFromUser = await dbUser.updateOne(
      { _id: id },
      {
        $pull: {
          posts: {
            postId,
          },
        },
      }
    );
    const deletePost = await dbPost.deleteOne({
      _id: postId,
      userId: publicID,
    });
    if (deletePostIdFromUser && deletePost) {
      return res.json({ status: "ok" });
    }
    res.json({ status: "error" });
  } catch (err) {
    next(err);
  }
};
module.exports = deletePost;
