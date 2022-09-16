const dbPost = require("../dbSchemas/post");

const like = async (req, res, next) => {
  try {
    const {
      body: { commentId, replyId, postId },
      user: { id, publicID },
    } = req;

    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $addToSet: {
          "comments.$[commentInd].replies.$[replyInd].likes": publicID,
        },
      },
      {
        arrayFilters: [
          {
            "commentInd._id": commentId,
          },
          {
            "replyInd._id": replyId,
          },
        ],
      }
    );

    if (liked.modifiedCount > 0) {
      res.json({ status: "ok" });
      return;
    }
    res.json({ status: "error", error: "Could not like this reply" });
  } catch (err) {
    next();
  }
};

const unLike = async (req, res, next) => {
  try {
    const {
      body: { commentId, replyId, postId },
      user: { publicID },
    } = req;

    const unLiked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $pull: {
          "comments.$[commentInd].replies.$[replyInd].likes": publicID,
        },
      },
      {
        arrayFilters: [
          {
            "commentInd._id": commentId,
          },
          {
            "replyInd._id": replyId,
          },
        ],
      }
    );


    if (unLiked.modifiedCount > 0) {
      res.json({ status: "ok" });
      return;
    }
    res.json({ status: "error", error: "Could not like this reply" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  like,
  unLike,
};
