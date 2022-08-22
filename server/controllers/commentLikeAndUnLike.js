const dbPost = require("../dbSchemas/post");

const like = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;

    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
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
      res.json({ success: true, message: "comment liked" });
    }
    res.json({ success: false, message: "Could not like this comment" });
  } catch (err) {
    console.log(err);
    next();
  }
};

const unLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { commentId } = req.body;

    const liked = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $pull: {
          "comments.$[indec].replies.$[indec].likes": id,
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
      res.json({ success: true, message: "comment unliked" });
      return;
    }
    res.json({ success: true, message: "could not unlike this comment" });
  } catch (err) {
    next();
  }
};

module.exports = {
  like,
  unLike,
};
