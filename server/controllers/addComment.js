const dbComment = require("../dbSchemas/comments");

const addComment = async (req, res) => {
  try {
    const {
      body: { content, id: postId },
      user: { id },
    } = req;

    const file = req.files?.file;

    const getFileInfo = () => {
      const [type, extension] = file.mimetype.split("/");
      return {
        type,
        name: `${new Date().getTime()}.${extension}`,
      };
    };

    const getCommentInfo = () => {
      if (!file) {
        return { content };
      } else if (!content) {
        return {
          file: getFileInfo(),
        };
      } else {
        return {
          content,
          file: getFileInfo(),
        };
      }
    };

    const commentInfo = getCommenttInfo();

    const addComment = await dbComment.updateOne(
      { postId },
      {
        $push: {
          comments: {
            owner: id,
            ...commentInfo,
          },
        },
      }
    );

    if (addComment) {
      file &&
        file.mv(`./public/${commentInfo.file.type}/${commentInfo.file.name}`);
      res.json({ message: "Comment added successfully" });
    } else {
      res.json({ success: false, message: "Can't add comment" });
    }
  } catch (err) {
    res.json({ success: false, message: "oops something went wrong" });
  }
};

module.exports = addComment;
