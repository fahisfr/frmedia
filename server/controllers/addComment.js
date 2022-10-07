const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const { getPcrInfo } = require("./helper");

const addComment = async (req, res, next) => {
  try {
    const {
      user: { publicID },
      body: { text, postId },
    } = req;
    const file = req.files?.file;

    const { hashTags, mentions, ...commentInfo } = getPcrInfo(text, file);

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
                pcr: "comment",
                userId: publicID,
                postId: newComment._id,
                commentId: newComment._doc.comments.pop()._id,
              },
            },
          }
        );
      }
      return;
    }

    res.json({ status: "error", error: "Can't add comment" });
  } catch (err) {
    next(err);
  }
};

module.exports = addComment;
