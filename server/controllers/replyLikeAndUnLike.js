const dbPost = require("../dbSchemas/post");

const like = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    const { commentId, replyId } = req.body

    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          "comments.$[commentInd].replies.$[replyInd].likes": id,
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

    console.log(liked);

    if (liked.modifiedCount > 0) {
      res.json({ status: "ok" });
    }
    res.json({ status: "error", error: "Could not like this reply" });
  } catch (err) {
    next();
  }
};

const unLike = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;
    const { commentId, replyId } = req.body

    const unLiked = dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          "comments.$[commentInd].replies.$[replyInd].likes": id,
        },
      },
      {
        arrayFilters: [
          {
            "commentInd._id": commentId,
          },
          {
            "replieInd._id": replyId,
          },
        ],
      }
    );

    if (unLiked.modifiedCount > 0) {
      res.json({ status: "ok" });
    }
    res.json({ status: "error", error: "Could not like this reply" });
  } catch (err) {
    next();
  }
};

module.exports = {
  like,
  unLike,
};
