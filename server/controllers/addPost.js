const  dbPost  = require("../dbSchemas/post");

const addPost = async (req, res) => {
  
  try {
    const {
      body: { content },
      user: { id, userName },
    } = req;

    const file = req.files?.file;
    const getFileInfo = () => {
      const [type, extension] = file.mimetype.split("/");
      return {
        type,
        name: `${new Date()}.${extension}`,
      };
    };

    const getPostInfo = () => {
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

    const postInfo = getPostInfo();

    const newPost = await dbPost.create({
      userName,
      userId: id,
      ...postInfo,
    });

    if (newPost) {

      file && file.mv(`./public/${postInfo.file.type}/${postInfo.file.name}`);
      res.json({ message: "Post added successfully" });

    } else {
      res.json({ success: false, message: "can't add post" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "oops something went wrong" });
  }
};

module.exports = addPost;
