const dbPost = require("../dbSchemas/post");
const { getPcrInfo } = require("./helper");

const reply = async (req, res, next) => {
  try {
    const { text, postId, commentId } = req.body;
    const { publicID } = req.user;
    const file = req.files?.file;

    const postInfo = getPcrInfo(text, file);
    const addReplay = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          "comments.$[index].replies": {
            userId: publicID,
            ...postInfo,
          },
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

    if (addReplay.modifiedCount > 0) {
      res.json({ status: "ok", message: "Reply added successfully" });
      return;
    }
    res.json({ status: "error", error: "err" });
  } catch (error) {
    next(error);
  }
};

module.exports = reply;
