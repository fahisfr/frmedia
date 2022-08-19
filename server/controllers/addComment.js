const dbPost = require("../dbSchemas/post");
const { getPostInfo } = require("./helper");

const addComment = async (req, res) => {

  try {

    const { id } = req.user;
    const { content, postId = undefi } = req.body;
    const file = req.files?.file;

    const commentInfo = getPostInfo(file, content);

    const addComment = await dbPost.updateOne(
      { _id: postId },
      {
        $push: {
          comments: {
            userId: id,
            ...commentInfo,
          },
        },
      }
    );


    if (addComment?.modifiedCount > 0) {
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
