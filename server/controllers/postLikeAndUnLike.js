const dbPost = require("../dbSchemas/post");
const objectId = require("mongoose").Types.ObjectId;
const dbUser = require("../dbSchemas/user");
const like = async (req, res, next) => {
  try {
    const {
      user: { publicID },
      body: { postId },
    } = req;

    const postLiked = await dbPost
      .findOneAndUpdate({ _id: postId }, { $addToSet: { likes: publicID } })
      .select("userId");

    if (postLiked) {
      const ress = await dbUser.updateOne(
        { _id: postLiked.userId },
        {
          $push: {
            notifications: {
              type: "liked",
              userId: publicID,
              postId,
            },
          },
          $inc: { notifCount: 1 },
        }
      );

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
      user: { publicID },
      body: { postId },
    } = req;
    const PostUnLiked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $pull: {
          likes: publicID,
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
