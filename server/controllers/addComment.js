const dbPost = require("../dbSchemas/post");
const getPcrInfo = require("../helper/getPcrInfo");

const addComment = async (req, res, next) => {
  try {
    const {
      user: { id, publicID },
      body: { text, postId },
    } = req;
    const file = req.files?.file;

    const commentInfo = getPcrInfo(text, file);

    const newComment = await dbPost.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          comments: {
            userId: publicID,
            ...commentInfo,
          },
        },
      },
      {
        new: true,
      }
    );

    if (newComment) {
      file &&
        file.mv(`./public/${commentInfo.file.type}/${commentInfo.file.name}`);

      res.json({
        status: "ok",
        message: "Comment Added Successfully",
        info: newComment._doc.comments.pop(),
      });
      return;
    }
    res.json({ status: "error", error: "Can't add comment" });
  } catch (err) {
    next(err);
  }
};

module.exports = addComment;
