const dbPost = require("../dbSchemas/post");

const like = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId, commentId } = req.body;

    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $addToSet: {
          "comments.$[index].likes": id,
        },
      },
      {
        arrayFilters: [
          {
            "index._id": commentId,
          },
        ],
      }
    );

    if (liked.modifiedCount > 0) {
      res.json({ status: "ok" });
      return;
    }
    res.json({ status: "error", error: "Could not like this comment" });
  } catch (err) {
    next(err);
  }
};

const unLike = async (req, res, next) => {
  try {
    const {
      body: { commentId, postId },
      user: { id },
    } = req;

    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $pull: {
          "comments.$[index].likes": id,
        },
      },
      {
        arrayFilters: [
          {
            "index._id": commentId,
          },
        ],
      }
    );

    if (liked.modifiedCount > 0) {
      res.json({ status: "ok" });
      return;
    }
    res.json({ status: "error", error: "could not unlike this comment" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  like,
  unLike,
};
