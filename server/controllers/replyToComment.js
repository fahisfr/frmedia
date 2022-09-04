const dbPost = require("../dbSchemas/post");
const { getPostInfo } = require("../helper/getPcrInfo");

const reply = async (req, res, next) => {
  try {
    const { text, postId, commentId } = req.body;
    const { id } = req.user;
    const file = req.files?.file;

    const postInfo = getPostInfo(file, text);
    const addReplay = await dbPost.updateOne(
      {
        _id: postId,
      },
      {
        $push: {
          "comments.$[index].replies": {
            userId: id,
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
    console.log(error);
    next(error);
  }
};

module.exports = reply;
