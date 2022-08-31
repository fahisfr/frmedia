const dbPost = require("../dbSchemas/post");
const { getPostInfo } = require("../helper");

const addComment = async (req, res, next) => {
  try {
    const {
      user: { id },
      body: { text, postId },
    } = req;
    const file = req.files?.file;
    console.log(req.body);

    const commentInfo = getPostInfo(file, text);

    const newComment = await dbPost.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          comments: {
            userId: id,
            ...commentInfo,
          },
        },
      },
      {
        new: true,
      }
    );
 
    if (newComment) {

      const comment = newComment._doc.comments.pop()
      
      file &&
        file.mv(`./public/${commentInfo.file.type}/${commentInfo.file.name}`);
     
      res.json({
        status: "ok",
        message: "Comment Added Successfully",
        info: { comment },
      });
      return;
    }
    res.json({ status: "error", error: "Can't add comment" });
  } catch (err) {
    next(err);
  }
};

module.exports = addComment;
