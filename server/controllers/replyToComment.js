const dbPost = require("../dbSchemas/post");
const getPostInfo = require("../helper");

const reply = async (req, res, next) => {
  try {
    const { postId } = req.params; 
    const { content, commentId } = req.body;
    const { id } = req.user;
    const file = req.files?.file;

    const postInfo = getPostInfo(file, content);
    const addReplay = await dbPost.updateOne(
      {
        postId,
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
    }
    res.json({ status: "error" });
  } catch (error) {
    next();
  }
};

module.exports = reply;
