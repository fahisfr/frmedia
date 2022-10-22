const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getPcrInfo } = require("./helper");
const { uploadFile } = require("../config/awsS3");

const addReply = async (req, res, next) => {
  try {
    const { text, postId, commentId } = req.body;
    const { publicID } = req.user;
    const file = req.file;

    const replyInfo = getPcrInfo(text, file);
    const { mentions, file: fileInfo } = replyInfo;
    if (file) {
      await uploadFile(file.buffer, fileInfo.name, fileInfo.type);
    }
    const newReply = await dbPost.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $push: {
          "comments.$[index].replies": {
            userId: publicID,
            ...replyInfo,
          },
        },
      },
      {
        arrayFilters: [
          {
            "index._id": commentId,
          },
        ],
        new: true,
      }
    );

    if (!newReply) return res.json({ status: "error", error: "err" });

    let reply;

    for (let comment of newReply.comments) {
      if (comment._id == commentId) {
        reply = comment.replies.pop();
        break;
      }
    }
    res.json({ status: "ok", info: reply, message: "Reply added successfully" });
    if (mentions?.length > 0) {
      await dbUser.updateMany(
        {
          userName: {
            $in: [...mentions],
          },
        },
        {
          $push: {
            notifications: {
              type: "mention",
              pcr: "reply",
              userId: publicID,
              postId: newReply._id,
              commentId,
              replyId: reply._id,
            },
          },
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = addReply;
