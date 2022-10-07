const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getPcrInfo } = require("./helper");

const addReply = async (req, res, next) => {
  try {
    const { text, postId, commentId } = req.body;
    const { publicID } = req.user;
    const file = req.files?.file;

    const { mentions, hashTags, ...postInfo } = getPcrInfo(text, file);
    const newReply = await dbPost.findOneAndUpdate(
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
        new: true,
      }
    );

    let reply;

    for (let comment of newReply.comments) {
      if (comment._id == commentId) {
        reply = comment.replies.pop();
        break;
      }
    }

    if (mentions.length > 0) {
      const addNotif = await dbUser.updateMany(
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

    if (newReply) {
      res.json({ status: "ok", info:reply, message: "Reply added successfully" });
      return;
    }
    res.json({ status: "error", error: "err" });
  } catch (error) {
    next(error);
  }
};

module.exports = addReply;
