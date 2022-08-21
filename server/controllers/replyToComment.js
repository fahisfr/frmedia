const dbPost = require("../dbSchemas/post");
const getPostInfo  = require("../helper");

const reply = async (req, res) => {
  
  try {
    const { content, postId, commentId } = req.body;
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
      res.json({
        success: true,
        message: "Reply added successfully",
      });
    }
    res.json({
      success: false,
      message: "Reply not added",
    });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: "oops somthing went wrong:(" });
  }
};

module.exports = reply;
