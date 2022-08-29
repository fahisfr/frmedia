const dbPost = require("../dbSchemas/post");

const like = async (req, res, next) => {
  try {
    const {
      user: { id },
      body: { postId },
    } = req;

    console.log(id);

    const postLiked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $addToSet: {
          likes: id,
        },
      }
    );

    console.log(postLiked);

    if (postLiked.modifiedCount > 0) {
      res.json({ status: "ok" });
      return;
    }
    res.json({ status: "error", error: "Could not like this post" });
  } catch (err) {
    next(err);
  }
};

const unLike = async (req, res, next) => {
  try {
    const {
      user: { id },
      body: { postId },
    } = req;
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
    next(err);
  }
};

module.exports = {
  like,
  unLike,
};
