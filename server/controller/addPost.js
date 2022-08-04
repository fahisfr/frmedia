const auth = require("../middleware/auth");
const dbPost = require("../dbSchemas/post");
const addPost = async (req, res) => {
  try {
    const {
      body: { content },
      user: { id },
    } = req;

    const file = req.files?.file;

    const getFileInfo = () => {
      const minmeType = file.mimetype.split("/");
      return {
        type: minmeType[0],
        name: `${new Date().getTime()}.${minmeType[1]}`,
      };
    };

    const postInfo = () => {
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

    dbPost
      .create({
        owner: id,
        ...postInfo(),
      })
      .then((result) => {
        file && file.mv(`./public/posts/${result._doc.file.name}`);
        res.json({ message: "Post added successfully" });
      })
      .catch((err) => {
        res.json({ success: false, message: "can't add post" });
      });
  } catch (err) {
    res.json({ success: false, message: "oops something went wrong" });
  }
};

module.exports = addPost;
