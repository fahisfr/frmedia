const dbPost = require("../dbSchemas/post");

const likePost = async (_, { postId }, { req, INSERR }) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    const PostLiked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          likes: id,
        },
      }
    );

    if (PostLiked.modifiedCount > 0) {
      res.json({ status: "ok" });
      return;
    }
    res.json({ status: "error", error: "Could not like this post" });
  } catch (err) {
    next();
  }
};

const unLikePost = async (_, { postId }, { req, INSERR }) => {
  try {
    const { id } = req.user;
    const {postId} =req.params
    const PostUnLiked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $pull: {
          likes: id,
        },
      }
    );

    if (PostUnLiked.modifiedCount > 0) {
      res.json({ status: "ok" });
      return;
    }
    res.json({ status: "error", error: "Could not unlike this post" });
  } catch (err) {
    next();
  }
};

module.exports = {
  likePost,
  unLikePost,
};
