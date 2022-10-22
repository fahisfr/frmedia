const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getPcrInfo } = require("./helper");
const { uploadFile } = require("../config/awsS3");

const addComment = async (req, res, next) => {
  try {
    const {
      user: { publicID },
      body: { text, postId },
    } = req;
    const file = req.file;

    const commentInfo = getPcrInfo(text, file);

    const { mentions, file: fileInfo } = commentInfo;

    if (file) {
      await uploadFile(file.buffer, fileInfo.name, fileInfo.type);
    }

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

    if (!newComment) {
      return res.json({ status: "error", error: "Can't add comment" });
    }

    res.json({
      status: "ok",
      message: "Comment Added Successfully",
      info: newComment._doc.comments.pop(),
    });

    if (mentions?.length > 0) {
      dbUser.updateMany(
        {
          userName: {
            $in: [...mentions],
          },
        },
        {
          $push: {
            notifications: {
              type: "mention",
              pcr: "comment",
              userId: publicID,
              postId: newComment._id,
              commentId: newComment._doc.comments.pop()._id,
            },
          },
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = addComment;
