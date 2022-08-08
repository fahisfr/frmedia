const dbComment = require("../dbSchemas/comments");

const addComment = async (req, res) => {
  console.log(req.body);
  try {
    const {
      body: { content,  postId },
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
        console.log("no file");
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

    const commentInfo = getCommentInfo();

    const addComment = await dbComment.updateOne(
      { postId:postId },
      {
        $push: {
          comments: {
            userId: id,
            ...commentInfo,
          },
        },
      }
    );


    if (addComment?.modifiedCount>0) {
      file &&
        file.mv(`./public/p/${commentInfo.file.type}/${commentInfo.file.name}`);
      res.json({ message: "Comment added successfully" });
    } else {
      res.json({ success: false, message: "Can't add comment" });
    }
  } catch (err) {
    res.json({ success: false, message: "oops something went wrong" });
  }
};

module.exports = addComment;
