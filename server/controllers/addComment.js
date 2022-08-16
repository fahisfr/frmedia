const dbPost = require("../dbSchemas/post");
const { getPostInfo } = require("./helper");

const addComment = async (req, res) => {
  try {
    const {
      body: { content, postId=undefi },
      user: { id },
    } = req;

    const file = req.files?.file;


    const commentInfo = getPostInfo(file, content);

    console.log("this post id " , postId);
    
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
    
    console.log(addComment);

    if (addComment?.modifiedCount > 0) {

      file &&
        file.mv(`./public/${commentInfo.file.type}/${commentInfo.file.name}`);
      res.json({ message: "Comment added successfully" });
    } else {
      res.json({ success: false, message: "Can't add comment" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "oops something went wrong" });
  }
};

module.exports = addComment;
