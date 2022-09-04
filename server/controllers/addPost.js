const dbPost = require("../dbSchemas/post");
const dbUser = require("../dbSchemas/user");
const getPcrInfo = require("../helper/getPcrInfo");

const addPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { id } = req.user;

    const file = req.files?.file;

    const { hashTags, mentions, ...postInfo } = getPcrInfo(text, file);

    const newPost = await dbPost.create({
      userId: id,
      ...postInfo,
      hashTags
    });

    if (newPost) {
      file && file.mv(`./public/${postInfo.file.type}/${postInfo.file.name}`);
      dbUser
        .updateOne({ _id: id }, { $push: { posts: newPost._id } })
        .then((res) => {});

      res.json({
        status: "ok",
        message: "Post Added Successfully",
        info: { ...newPost._doc, liked: false, likesCount: 0 },
      });
      return;
    }
    res.json({ status: "error", error: "can't add post" });
  } catch (err) {
    next(err);
  }
};

module.exports = addPost;
